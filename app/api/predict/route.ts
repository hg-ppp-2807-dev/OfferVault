import { NextRequest, NextResponse } from "next/server";
import { callOllama } from "@/lib/ollama";
import { predictionPrompt } from "@/lib/prompts";
import { safeJSONParse } from "@/utils/parse";
import type { PredictionResult, ApiResponse } from "@/types";

export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<PredictionResult>>> {
  try {
    const { role, skills, resumeScore, interviewScore, consistency } = await req.json();

    if (!role?.trim()) return NextResponse.json({ success: false, error: "Role is required." }, { status: 400 });
    if (!skills?.trim()) return NextResponse.json({ success: false, error: "Skills are required." }, { status: 400 });

    const raw = await callOllama(
      predictionPrompt(role, skills, resumeScore ?? 50, interviewScore ?? 50, consistency ?? "moderate"),
      { temperature: 0.4, num_predict: 600 }
    );
    const parsed = safeJSONParse<PredictionResult>(raw);

    if (!parsed) return NextResponse.json({ success: false, error: "Failed to parse AI response." }, { status: 500 });

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error("[predict] Error:", error);
    return NextResponse.json({ success: false, error: "Prediction failed." }, { status: 500 });
  }
}
