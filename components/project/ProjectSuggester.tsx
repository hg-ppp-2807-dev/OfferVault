"use client";

import { useState } from "react";
import { Code, Layers, Star, Lightbulb } from "lucide-react";
import type { ProjectSuggestion } from "@/types";

export function ProjectSuggester() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProjectSuggestion | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills }),
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
          <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Full Stack Developer"
            className="w-full rounded-lg border border-white/8 bg-coal-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-400/40 focus:outline-none focus:ring-1 focus:ring-emerald-400/20"
            required />
        </div>
        <div>
          <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">Your Current Skills</label>
          <textarea value={skills} onChange={e => setSkills(e.target.value)}
            placeholder="e.g. React, Node.js, PostgreSQL, TypeScript, Docker..."
            rows={3} className="w-full rounded-lg border border-white/8 bg-coal-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-400/40 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 resize-none"
            required />
        </div>
        {error && <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-display font-bold text-white hover:bg-emerald-400 disabled:opacity-50 transition-colors">
          {loading ? "Generating project idea..." : "Suggest a Project →"}
        </button>
      </form>

      {result && (
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-6 space-y-5">
          {/* Title + description */}
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">{result.description}</p>
          </div>

          {/* Tech stack */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.tech_stack.map((tech, i) => (
                <span key={i} className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-mono text-emerald-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-sky-400" />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Key Features</span>
            </div>
            <ul className="space-y-1.5">
              {result.features.map((f, i) => (
                <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                  <Star className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />{f}
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm text-zinc-300">{result.impact}</p>
          </div>
        </div>
      )}
    </div>
  );
}
