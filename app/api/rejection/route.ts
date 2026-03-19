import { NextRequest, NextResponse } from "next/server";
import { callOllama } from "@/lib/ollama";
import { rejectionPrompt } from "@/lib/prompts";
import { safeJSONParse } from "@/utils/parse";
import type { RejectionAnalysis, ApiResponse } from "@/types";

export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<RejectionAnalysis>>> {
  try {
    const { role, company, resume } = await req.json();

    if (!role?.trim()) return NextResponse.json({ success: false, error: "Role is required." }, { status: 400 });
    if (!company?.trim()) return NextResponse.json({ success: false, error: "Company type is required." }, { status: 400 });
    if (!resume?.trim()) return NextResponse.json({ success: false, error: "Resume text is required." }, { status: 400 });

    const raw = await callOllama(rejectionPrompt(role, company, resume), { temperature: 0.3, num_predict: 800 });
    const parsed = safeJSONParse<RejectionAnalysis>(raw);

    if (!parsed) return NextResponse.json({ success: false, error: "Failed to parse AI response." }, { status: 500 });

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error("[rejection] Error:", error);
    return NextResponse.json({ success: false, error: "Rejection analysis failed." }, { status: 500 });
  }
}
