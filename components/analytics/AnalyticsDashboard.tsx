"use client";

import { useState } from "react";
import { BarChart2 } from "lucide-react";
import { PlacementDonut } from "@/components/charts/PlacementDonut";
import { SkillHeatmap } from "@/components/charts/SkillHeatmap";
import { ResumeRadar } from "@/components/charts/ResumeRadar";
import { InterviewBarChart } from "@/components/charts/InterviewBarChart";
import type { CategoryScores, InterviewEvaluation } from "@/types";

// Default demo data shown before user edits
const DEFAULT_RESUME_SCORES: CategoryScores = {
  content: 65, ats: 50, structure: 72, grammar: 80, impact: 45,
};

const DEFAULT_INTERVIEW: InterviewEvaluation = {
  overall_score: 62,
  communication: 70,
  technical_depth: 55,
  relevance: 68,
  confidence: 60,
  feedback: "",
  strengths: [],
  areas_to_improve: [],
};

const DEFAULT_SKILLS = [
  { name: "DSA", level: 30 },
  { name: "React", level: 70 },
  { name: "System Design", level: 20 },
  { name: "SQL", level: 60 },
  { name: "Node.js", level: 75 },
  { name: "Docker", level: 25 },
];

export function AnalyticsDashboard() {
  const [resumeScore, setResumeScore] = useState(65);
  const [interviewScore, setInterviewScore] = useState(62);
  const [predictionScore, setPredictionScore] = useState(55);

  return (
    <div className="space-y-6">
      {/* Top donut row */}
      <div>
        <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-4">Placement Index</p>
        <div className="rounded-xl border border-white/8 bg-coal-800 p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col items-center gap-2">
              <PlacementDonut score={resumeScore} label="Resume" color="#fbbf24" />
              <input type="range" min={0} max={100} value={resumeScore}
                onChange={e => setResumeScore(+e.target.value)}
                className="w-32 accent-amber-400" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <PlacementDonut score={interviewScore} label="Interview" color="#a78bfa" />
              <input type="range" min={0} max={100} value={interviewScore}
                onChange={e => setInterviewScore(+e.target.value)}
                className="w-32 accent-violet-400" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <PlacementDonut score={predictionScore} label="Prediction" color="#34d399" />
              <input type="range" min={0} max={100} value={predictionScore}
                onChange={e => setPredictionScore(+e.target.value)}
                className="w-32 accent-emerald-400" />
            </div>
          </div>
          {/* Composite score */}
          <div className="rounded-lg bg-coal-900 border border-white/5 p-4 text-center">
            <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-1">Composite Placement Score</p>
            <p className="font-display text-4xl font-bold text-white">
              {Math.round((resumeScore + interviewScore + predictionScore) / 3)}
            </p>
            <div className="mt-2 h-2 w-full rounded-full bg-coal-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-violet-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${Math.round((resumeScore + interviewScore + predictionScore) / 3)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Radar + Bar row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-2">Resume Radar</p>
          <ResumeRadar data={DEFAULT_RESUME_SCORES} />
        </div>
        <div>
          <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-2">Interview Performance</p>
          <InterviewBarChart evaluation={{
            ...DEFAULT_INTERVIEW,
            overall_score: interviewScore,
            communication: Math.max(10, interviewScore + 8),
            technical_depth: Math.max(10, interviewScore - 7),
            relevance: Math.max(10, interviewScore + 6),
            confidence: Math.max(10, interviewScore - 2),
          }} />
        </div>
      </div>

      {/* Skill heatmap */}
      <div>
        <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-2">Skill Gap Heatmap</p>
        <SkillHeatmap skills={DEFAULT_SKILLS} />
      </div>

      {/* Info note */}
      <p className="text-center text-xs text-zinc-700 font-mono">
        ↑ Sliders above update scores live. Run individual modules for real AI analysis.
      </p>
    </div>
  );
}
