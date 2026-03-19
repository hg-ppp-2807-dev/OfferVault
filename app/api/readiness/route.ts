import { NextRequest, NextResponse } from "next/server";
import { callOllama } from "@/lib/ollama";
import { readinessPrompt } from "@/lib/prompts";
import { safeJSONParse } from "@/utils/parse";
import type { ReadinessResult, ApiResponse } from "@/types";

export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<ReadinessResult>>> {
  try {
    const { role, resumeScore, interviewScore, skills } = await req.json();

    if (!role?.trim()) return NextResponse.json({ success: false, error: "Role is required." }, { status: 400 });
    if (!skills?.trim()) return NextResponse.json({ success: false, error: "Skills are required." }, { status: 400 });

    const raw = await callOllama(
      readinessPrompt(role, resumeScore ?? 50, interviewScore ?? 50, skills),
      { temperature: 0.3, num_predict: 600 }
    );
    const parsed = safeJSONParse<ReadinessResult>(raw);

    if (!parsed) return NextResponse.json({ success: false, error: "Failed to parse AI response." }, { status: 500 });

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error("[readiness] Error:", error);
    return NextResponse.json({ success: false, error: "Readiness evaluation failed." }, { status: 500 });
  }
}
