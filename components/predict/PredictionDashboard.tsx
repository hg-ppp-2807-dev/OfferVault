"use client";

import { useState } from "react";
import { TrendingUp, Clock, ShieldAlert, Zap } from "lucide-react";
import type { PredictionResult } from "@/types";

const CHANCE_COLOR = { "Low": "text-red-400", "Medium": "text-amber-400", "High": "text-sky-400", "Very High": "text-emerald-400" };
const CHANCE_BG   = { "Low": "bg-red-400",   "Medium": "bg-amber-400",   "High": "bg-sky-400",   "Very High": "bg-emerald-400"   };
const CHANCE_SCORE = { "Low": 20, "Medium": 50, "High": 75, "Very High": 95 };

export function PredictionDashboard() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeScore, setResumeScore] = useState(50);
  const [interviewScore, setInterviewScore] = useState(50);
  const [consistency, setConsistency] = useState("moderate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills, resumeScore, interviewScore, consistency }),
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">Target Role</label>
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Backend Developer"
              className="w-full rounded-lg border border-white/8 bg-coal-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-violet-400/40 focus:outline-none focus:ring-1 focus:ring-violet-400/20"
              required />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">Consistency Level</label>
            <select value={consistency} onChange={e => setConsistency(e.target.value)}
              className="w-full rounded-lg border border-white/8 bg-coal-900 px-3 py-2.5 text-sm text-white focus:border-violet-400/40 focus:outline-none focus:ring-1 focus:ring-violet-400/20">
              <option value="low">Low (occasional study)</option>
              <option value="moderate">Moderate (3-4 hrs/day)</option>
              <option value="high">High (6+ hrs/day)</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">Your Skills</label>
          <textarea value={skills} onChange={e => setSkills(e.target.value)}
            placeholder="e.g. Node.js, Express, MongoDB, REST APIs, Git..."
            rows={3} className="w-full rounded-lg border border-white/8 bg-coal-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-violet-400/40 focus:outline-none focus:ring-1 focus:ring-violet-400/20 resize-none"
            required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">
              Resume Score: <span className="text-violet-400">{resumeScore}</span>
            </label>
            <input type="range" min={0} max={100} value={resumeScore} onChange={e => setResumeScore(+e.target.value)} className="w-full accent-violet-400" />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">
              Interview Score: <span className="text-violet-400">{interviewScore}</span>
            </label>
            <input type="range" min={0} max={100} value={interviewScore} onChange={e => setInterviewScore(+e.target.value)} className="w-full accent-violet-400" />
          </div>
        </div>
        {error && <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-display font-bold text-white hover:bg-violet-400 disabled:opacity-50 transition-colors">
          {loading ? "Predicting your chances..." : "Predict Placement Chance →"}
        </button>
      </form>

      {result && (
        <div className="space-y-4">
          {/* Main result */}
          <div className="rounded-xl border border-white/8 bg-coal-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className={`font-display text-3xl font-bold ${CHANCE_COLOR[result.placement_chance]}`}>{result.placement_chance}</p>
                <p className="text-zinc-500 text-sm font-mono">placement chance · {result.confidence_level} confidence</p>
              </div>
              <div className="text-center bg-coal-900 rounded-xl p-4 border border-white/8">
                <Clock className="h-4 w-4 text-zinc-500 mx-auto mb-1" />
                <p className="font-display text-2xl font-bold text-white">{result.estimated_days}</p>
                <p className="text-xs text-zinc-500 font-mono">days est.</p>
              </div>
            </div>
            <div className="h-3 rounded-full bg-coal-900 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${CHANCE_BG[result.placement_chance]}`}
                style={{ width: `${CHANCE_SCORE[result.placement_chance]}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="h-4 w-4 text-red-400" />
                <span className="text-sm font-display font-semibold text-red-400">Risks</span>
              </div>
              <ul className="space-y-2">
                {result.risks.map((r, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-1.5">
                    <span className="mt-1 h-1 w-1 rounded-full shrink-0 bg-red-400" />{r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-violet-400/20 bg-violet-400/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-display font-semibold text-violet-400">Actions</span>
              </div>
              <ul className="space-y-2">
                {result.actions.map((a, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-1.5">
                    <span className="mt-1 h-1 w-1 rounded-full shrink-0 bg-violet-400" />{a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
