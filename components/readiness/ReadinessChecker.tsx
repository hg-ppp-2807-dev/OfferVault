"use client";

import { useState } from "react";
import { Target, TrendingUp, TrendingDown, Zap } from "lucide-react";
import type { ReadinessResult } from "@/types";

const LEVEL_COLOR = {
  "Not Ready": "text-red-400",
  "Partially Ready": "text-amber-400",
  "Almost Ready": "text-sky-400",
  "Ready": "text-emerald-400",
};

const LEVEL_BG = {
  "Not Ready": "bg-red-400",
  "Partially Ready": "bg-amber-400",
  "Almost Ready": "bg-sky-400",
  "Ready": "bg-emerald-400",
};

export function ReadinessChecker() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeScore, setResumeScore] = useState(50);
  const [interviewScore, setInterviewScore] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReadinessResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills, resumeScore, interviewScore }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-white/8 bg-coal-800 p-6">
        <div>
          <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">Target Role</label>
          <input
            value={role} onChange={e => setRole(e.target.value)}
            placeholder="e.g. Data Analyst"
            className="w-full rounded-lg border border-white/8 bg-coal-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-sky-400/40 focus:outline-none focus:ring-1 focus:ring-sky-400/20"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">Your Current Skills</label>
          <textarea
            value={skills} onChange={e => setSkills(e.target.value)}
            placeholder="e.g. Python, SQL, Excel, basic ML, Tableau..."
            rows={3}
            className="w-full rounded-lg border border-white/8 bg-coal-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-sky-400/40 focus:outline-none focus:ring-1 focus:ring-sky-400/20 resize-none"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">
              Resume Score: <span className="text-sky-400">{resumeScore}</span>
            </label>
            <input type="range" min={0} max={100} value={resumeScore} onChange={e => setResumeScore(+e.target.value)}
              className="w-full accent-sky-400" />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">
              Interview Score: <span className="text-sky-400">{interviewScore}</span>
            </label>
            <input type="range" min={0} max={100} value={interviewScore} onChange={e => setInterviewScore(+e.target.value)}
              className="w-full accent-sky-400" />
          </div>
        </div>
        {error && <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-display font-bold text-white hover:bg-sky-400 disabled:opacity-50 transition-colors">
          {loading ? "Evaluating readiness..." : "Check My Readiness →"}
        </button>
      </form>

      {result && (
        <div className="space-y-4">
          {/* Score */}
          <div className="rounded-xl border border-white/8 bg-coal-800 p-6 flex items-center gap-6">
            <div className="text-center">
              <p className={`font-display text-5xl font-bold ${LEVEL_COLOR[result.level]}`}>{result.readiness_score}</p>
              <p className="text-xs font-mono text-zinc-500 mt-1">READINESS SCORE</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Target className={`h-4 w-4 ${LEVEL_COLOR[result.level]}`} />
                <span className={`font-display font-bold ${LEVEL_COLOR[result.level]}`}>{result.level}</span>
              </div>
              <div className="h-2 rounded-full bg-coal-900 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${LEVEL_BG[result.level]}`}
                  style={{ width: `${result.readiness_score}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Strengths", icon: TrendingUp, color: "text-emerald-400", bgColor: "bg-emerald-400/10", borderColor: "border-emerald-400/20", items: result.strengths },
              { label: "Weaknesses", icon: TrendingDown, color: "text-red-400", bgColor: "bg-red-400/10", borderColor: "border-red-400/20", items: result.weaknesses },
              { label: "Next Actions", icon: Zap, color: "text-amber-400", bgColor: "bg-amber-400/10", borderColor: "border-amber-400/20", items: result.next_actions },
            ].map(({ label, icon: Icon, color, bgColor, borderColor, items }) => (
              <div key={label} className={`rounded-xl border ${borderColor} ${bgColor} p-4`}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`h-4 w-4 ${color}`} />
                  <span className={`text-sm font-display font-semibold ${color}`}>{label}</span>
                </div>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="text-xs text-zinc-300 flex items-start gap-1.5">
                      <span className={`mt-1 h-1 w-1 rounded-full shrink-0 ${color.replace("text-", "bg-")}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
