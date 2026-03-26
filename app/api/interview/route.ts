import { NextRequest, NextResponse } from "next/server";
import { callOllama } from "@/lib/ollama";
import { saveInterviewSession } from "@/lib/mongodb";
import type { InterviewMessage, InterviewEvaluation, ApiResponse } from "@/types";

export const maxDuration = 60;
export const runtime = "nodejs";

const TOTAL_QUESTIONS = 5;

function buildSystemPrompt(role: string, questionNumber: number, totalAnswered: number): string {
  if (totalAnswered >= TOTAL_QUESTIONS) {
    return `You are a technical interviewer. The interview is now complete. Respond with exactly: "INTERVIEW_COMPLETE"`;
  }
  return `You are a technical interviewer conducting a mock interview for a ${role} role. This is question ${questionNumber} of ${TOTAL_QUESTIONS}. Ask exactly ONE clear interview question. Do not give the answer. Do not explain. Just ask the question directly.`;
}

const EVALUATION_PROMPT = `You are an expert interview coach. Evaluate the following mock interview transcript and return a JSON object:

{
  "overall_score": <number 0-100>,
  "communication": <number 0-100>,
  "technical_depth": <number 0-100>,
  "relevance": <number 0-100>,
  "confidence": <number 0-100>,
  "feedback": "<2-3 paragraph comprehensive feedback>",
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "areas_to_improve": ["<area1>", "<area2>", "<area3>"]
}

Be honest, specific, and constructive. Return ONLY valid JSON.`;

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<{ message: string; completed: boolean; evaluation?: InterviewEvaluation }>>> {
  try {
    const body = await req.json();
    const { role, messages }: { role: string; messages: InterviewMessage[] } = body;

    if (!role?.trim()) {
      return NextResponse.json({ success: false, error: "Role is required." }, { status: 400 });
    }

    if (!Array.isArray(messages)) {
      return NextResponse.json({ success: false, error: "Messages must be an array." }, { status: 400 });
    }

    const userMessages = messages.filter((m) => m.role === "user");
    const questionNumber = userMessages.length + 1;
    const totalAnswered = userMessages.length;

    // Build conversation for Ollama
    const groqMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
      {
        role: "system",
        content: buildSystemPrompt(role, questionNumber, totalAnswered),
      },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    // If interview is complete, evaluate
    if (totalAnswered >= TOTAL_QUESTIONS) {
      // Call Ollama for evaluation
      const transcript = messages.map((m) => `${m.role}: ${m.content}`).join("\n");
      const evalPrompt = `${EVALUATION_PROMPT}\n\n${transcript}`;
      const evalResponse = await callOllama(evalPrompt);
      let evaluation: InterviewEvaluation | undefined = undefined;
      try {
        evaluation = JSON.parse(evalResponse);
      } catch (e) {
        return NextResponse.json({ success: false, error: "Failed to parse evaluation." }, { status: 500 });
      }

      if (!evaluation) {
        return NextResponse.json({ success: false, error: "Evaluation is missing." }, { status: 500 });
      }

      // Persist session
      saveInterviewSession({
        role,
        question_count: TOTAL_QUESTIONS,
        overall_score: evaluation.overall_score,
        created_at: new Date().toISOString(),
      }).catch(console.error);

      return NextResponse.json({
        success: true,
        data: {
          message: "Great interview! Here is your evaluation.",
          completed: true,
          evaluation,
        },
      });
    }

    // Call Ollama with the constructed messages
    // Convert groqMessages to a single prompt string
    const prompt = groqMessages.map((m) => `${m.role}: ${m.content}`).join("\n");
    const response = await callOllama(prompt);

    return NextResponse.json({
      success: true,
      data: { message: response, completed: false },
    });
  } catch (error) {
    console.error("[interview] Error:", error);
    return NextResponse.json(
      { success: false, error: "Interview API error. Please try again." },
      { status: 500 }
    );
  }
}
