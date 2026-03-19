// ─── All LLM prompts in one place ────────────────────────────────────────────

export const BASE_SYSTEM = `You are an expert placement coach. Be strict and realistic. No generic advice. Keep answers concise. Return ONLY valid JSON.`;

export const rejectionPrompt = (role: string, company: string, resume: string) => `
${BASE_SYSTEM}

Analyze why this candidate will likely get rejected.

Role: ${role}
Company Type: ${company}

Resume:
${resume.slice(0, 3000)}

Return this exact JSON:
{
  "rejection_score": <number 0-100, higher = more likely to get rejected>,
  "verdict": "<one sentence verdict>",
  "reasons": ["<reason1>", "<reason2>", "<reason3>"],
  "missing_skills": ["<skill1>", "<skill2>"],
  "red_flags": ["<red_flag1>", "<red_flag2>"],
  "fix_plan": ["<action1>", "<action2>", "<action3>"]
}
`;

export const readinessPrompt = (
  role: string,
  resumeScore: number,
  interviewScore: number,
  skills: string
) => `
${BASE_SYSTEM}

Evaluate this candidate's placement readiness.

Role: ${role}
Resume Score: ${resumeScore}/100
Interview Score: ${interviewScore}/100
Skills: ${skills}

Return this exact JSON:
{
  "readiness_score": <number 0-100>,
  "level": "<Not Ready | Partially Ready | Almost Ready | Ready>",
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "weaknesses": ["<weakness1>", "<weakness2>", "<weakness3>"],
  "next_actions": ["<action1>", "<action2>", "<action3>"]
}
`;

export const predictionPrompt = (
  role: string,
  skills: string,
  resumeScore: number,
  interviewScore: number,
  consistency: string
) => `
${BASE_SYSTEM}

Predict this candidate's placement chances realistically.

Role: ${role}
Skills: ${skills}
Resume Score: ${resumeScore}/100
Interview Score: ${interviewScore}/100
Consistency: ${consistency}

Return this exact JSON:
{
  "placement_chance": "<Low | Medium | High | Very High>",
  "confidence_level": "<number>%",
  "estimated_days": <number of days to placement>,
  "risks": ["<risk1>", "<risk2>"],
  "actions": ["<action1>", "<action2>", "<action3>"]
}
`;

export const projectPrompt = (role: string, skills: string) => `
${BASE_SYSTEM}

Suggest one strong portfolio project that will get this candidate noticed.

Role: ${role}
Skills: ${skills}

Return this exact JSON:
{
  "title": "<project title>",
  "description": "<2-3 sentence description>",
  "tech_stack": ["<tech1>", "<tech2>", "<tech3>"],
  "features": ["<feature1>", "<feature2>", "<feature3>", "<feature4>"],
  "impact": "<why this project stands out to recruiters>"
}
`;
