import { NextRequest, NextResponse } from "next/server";
import { groqJSON } from "@/lib/groq";
import { extractTextFromPDF, fileToBuffer, wordCount } from "@/lib/pdf-utils";
import { saveResumeAnalysis } from "@/lib/supabase";
import type { ResumeAnalysis, ApiResponse } from "@/types";

export const maxDuration = 60;
export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are an expert resume reviewer and career coach with 15+ years of experience in technical recruiting.
Analyze the provided resume and return a JSON object with this exact structure:

{
  "score": <number 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "mistakes": [
    {
      "category": "<formatting|content|ats|grammar|structure>",
      "severity": "<high|medium|low>",
      "title": "<short title>",
      "description": "<specific actionable description>"
    }
  ],
  "improvements": [
    {
      "section": "<section name>",
      "current": "<what is wrong or missing>",
      "suggested": "<concrete suggestion>",
      "impact": "<high|medium|low>"
    }
  ],
  "keywords_missing": ["<keyword1>", "<keyword2>"]
}

Be specific, honest, and constructive. Return ONLY valid JSON — no markdown, no extra text.`;

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<ResumeAnalysis>>> {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded." }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Only PDF files are supported." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size must be under 5 MB." },
        { status: 400 }
      );
    }

    // Extract text
    const buffer = await fileToBuffer(file);
    const resumeText = await extractTextFromPDF(buffer);

    if (!resumeText || wordCount(resumeText) < 50) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not extract enough text from the PDF. Is it a scanned image?",
        },
        { status: 422 }
      );
    }

    // Call Ollama
    const analysis = await groqJSON<ResumeAnalysis>(
      [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Please analyze this resume:\n\n---\n${resumeText.slice(0, 6000)}\n---`,
        },
      ],
      { temperature: 0.3, max_tokens: 3000 }
    );

    // Persist to Supabase (fire-and-forget)
    saveResumeAnalysis({
      score: analysis.score,
      summary: analysis.summary,
      mistakes_count: analysis.mistakes.length,
      improvements_count: analysis.improvements.length,
      created_at: new Date().toISOString(),
    }).catch(console.error);

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error("[analyze-resume] Error:", error);
    return NextResponse.json(
      { success: false, error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
