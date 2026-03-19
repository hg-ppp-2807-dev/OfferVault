import { NextRequest, NextResponse } from "next/server";
import { callOllama } from "@/lib/ollama";
import { projectPrompt } from "@/lib/prompts";
import { safeJSONParse } from "@/utils/parse";
import type { ProjectSuggestion, ApiResponse } from "@/types";

export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<ProjectSuggestion>>> {
  try {
    const { role, skills } = await req.json();

    if (!role?.trim()) return NextResponse.json({ success: false, error: "Role is required." }, { status: 400 });
    if (!skills?.trim()) return NextResponse.json({ success: false, error: "Skills are required." }, { status: 400 });

    const raw = await callOllama(projectPrompt(role, skills), { temperature: 0.6, num_predict: 600 });
    const parsed = safeJSONParse<ProjectSuggestion>(raw);

    if (!parsed) return NextResponse.json({ success: false, error: "Failed to parse AI response." }, { status: 500 });

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error("[project] Error:", error);
    return NextResponse.json({ success: false, error: "Project suggestion failed." }, { status: 500 });
  }
}
