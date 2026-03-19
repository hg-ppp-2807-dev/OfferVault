"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Wrench, ChevronDown, ChevronUp } from "lucide-react";
import type { RejectionAnalysis } from "@/types";

export function RejectionAnalyzer() {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RejectionAnalysis | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("reasons");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/rejection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, company, resume }),
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

  const scoreColor = result
    ? result.rejection_score >= 70 ? "text-red-400" : result.rejection_score >= 40 ? "text-amber-400" : "text-emerald-400"
    : "text-zinc-400";

  const toggle = (key: string) => setExpandedSection(expandedSection === key ? null : key);

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-white/8 bg-coal-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">Target Role</label>
            <input
              value={role}
              onChange={e => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-lg border border-white/8 bg-coal-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-400/40 focus:outline-none focus:ring-1 focus:ring-red-400/20"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">Company Type</label>
            <select
              value={company}
              onChange={e => setCompany(e.target.value)}
              className="w-full rounded-lg border border-white/8 bg-coal-900 px-3 py-2.5 text-sm text-white focus:border-red-400/40 focus:outline-none focus:ring-1 focus:ring-red-400/20"
              required
            >
              <option value="">Select type...</option>
              <option value="product-based">Product-based (FAANG, startups)</option>
              <option value="service-based">Service-based (TCS, Infosys)</option>
              <option value="startup">Early-stage Startup</option>
              <option value="mid-market">Mid-market Company</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">Paste Your Resume Text</label>
          <textarea
            value={resume}
            onChange={e => setResume(e.target.value)}
            placeholder="Paste the text content of your resume here..."
            rows={7}
            className="w-full rounded-lg border border-white/8 bg-coal-900 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-red-400/40 focus:outline-none focus:ring-1 focus:ring-red-400/20 resize-none font-mono"
            required
          />
        </div>
        {error && <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-500 px-4 py-2.5 text-sm font-display font-bold text-white hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Analyzing rejection risks..." : "Analyze Rejection Risk →"}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Score card */}
          <div className="rounded-xl border border-white/8 bg-coal-800 p-6 flex items-center gap-6">
            <div className="text-center">
              <p className={`font-display text-5xl font-bold ${scoreColor}`}>{result.rejection_score}</p>
              <p className="text-xs font-mono text-zinc-500 mt-1">REJECTION RISK</p>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-lg">{result.verdict}</p>
              <div className="mt-2 h-2 rounded-full bg-coal-900 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${result.rejection_score >= 70 ? "bg-red-400" : result.rejection_score >= 40 ? "bg-amber-400" : "bg-emerald-400"}`}
                  style={{ width: `${result.rejection_score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Collapsible sections */}
          {[
            { key: "reasons", label: "Rejection Reasons", icon: XCircle, color: "text-red-400", items: result.reasons },
            { key: "red_flags", label: "Red Flags", icon: AlertTriangle, color: "text-amber-400", items: result.red_flags },
            { key: "missing_skills", label: "Missing Skills", icon: CheckCircle, color: "text-violet-400", items: result.missing_skills },
            { key: "fix_plan", label: "Fix Plan", icon: Wrench, color: "text-emerald-400", items: result.fix_plan },
          ].map(({ key, label, icon: Icon, color, items }) => (
            <div key={key} className="rounded-xl border border-white/8 bg-coal-800 overflow-hidden">
              <button
                onClick={() => toggle(key)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${color}`} />
                  <span className="font-display font-semibold text-white">{label}</span>
                  <span className="text-xs font-mono text-zinc-600">({items.length})</span>
                </div>
                {expandedSection === key ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
              </button>
              {expandedSection === key && (
                <ul className="px-4 pb-4 space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${color.replace("text-", "bg-")}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
