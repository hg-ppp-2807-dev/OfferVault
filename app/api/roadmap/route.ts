import { NextRequest, NextResponse } from "next/server";
import { groqJSON } from "@/lib/groq";
import { saveRoadmap } from "@/lib/supabase";
import type { RoadmapInput, Roadmap, ApiResponse } from "@/types";

export const maxDuration = 60;
export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are a senior career coach and learning strategist. Create a detailed, actionable learning roadmap.
Return a JSON object with this EXACT structure:

{
  "role": "<target role>",
  "timeline": "<timeline>",
  "overview": "<2-3 sentence overview of the path>",
  "core_skills": ["<skill1>", "<skill2>", "<skill3>", "<skill4>", "<skill5>"],
  "daily_tasks": [
    {
      "day": 1,
      "title": "<day title>",
      "tasks": ["<task1>", "<task2>", "<task3>"],
      "focus_area": "<main topic>",
      "duration_hours": 2
    }
  ],
  "weekly_plans": [
    {
      "week": 1,
      "theme": "<week theme>",
      "goals": ["<goal1>", "<goal2>"],
      "topics": ["<topic1>", "<topic2>", "<topic3>"],
      "projects": ["<hands-on project>"],
      "resources": ["<resource name + type>"]
    }
  ],
  "milestones": [
    { "week": 2, "milestone": "<what they should be able to do>" }
  ],
  "resources": [
    { "name": "<resource name>", "url": "<url or platform>", "type": "<course|book|tool|practice>" }
  ]
}

Requirements:
- daily_tasks: provide first 7 days (days 1-7)
- weekly_plans: provide plans based on the timeline (1 month = 4 weeks, 3 months = 8 weeks summary, etc.)
- milestones: at least 3 milestones
- resources: 5-8 quality resources
- Be SPECIFIC and ACTIONABLE — no vague suggestions
- Tailor to the candidate's experience level and current skills

Return ONLY valid JSON — no markdown, no extra text.`;

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Roadmap>>> {
  try {
    const body: RoadmapInput = await req.json();
    const { role, current_skills, target_timeline, experience_level } = body;

    if (!role?.trim()) {
      return NextResponse.json({ success: false, error: "Role is required." }, { status: 400 });
    }

    if (!current_skills?.trim()) {
      return NextResponse.json(
        { success: false, error: "Current skills are required." },
        { status: 400 }
      );
    }

    const prompt = `Create a placement roadmap for:
- Target Role: ${role}
- Current Skills: ${current_skills}
- Target Timeline: ${target_timeline || "3 months"}
- Experience Level: ${experience_level || "fresher"}

Generate a realistic, detailed roadmap tailored to this specific profile.`;

    const roadmap = await groqJSON<Roadmap>(
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      { temperature: 0.5, max_tokens: 4000 }
    );

    // Ensure role and timeline are set from input
    roadmap.role = role;
    roadmap.timeline = target_timeline || "3 months";

    // Persist
    saveRoadmap({
      role,
      timeline: target_timeline,
      experience_level,
      created_at: new Date().toISOString(),
    }).catch(console.error);

    return NextResponse.json({ success: true, data: roadmap });
  } catch (error) {
    console.error("[roadmap] Error:", error);
    return NextResponse.json(
      { success: false, error: "Roadmap generation failed. Please try again." },
      { status: 500 }
    );
  }
}
