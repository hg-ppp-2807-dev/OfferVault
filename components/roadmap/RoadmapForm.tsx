"use client";

import { useState } from "react";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, ErrorMessage } from "@/components/ui/index";
import type { RoadmapInput, Roadmap } from "@/types";

interface RoadmapFormProps {
  onResult: (roadmap: Roadmap) => void;
  onLoading: (loading: boolean) => void;
  loading: boolean;
}

const experienceLevels = [
  { value: "fresher", label: "Fresher (0 yrs)" },
  { value: "junior", label: "Junior (1-2 yrs)" },
  { value: "mid", label: "Mid (3-5 yrs)" },
  { value: "senior", label: "Senior (5+ yrs)" },
] as const;

const timelines = [
  "1 month",
  "2 months",
  "3 months",
  "6 months",
  "1 year",
];

export function RoadmapForm({ onResult, onLoading, loading }: RoadmapFormProps) {
  const [form, setForm] = useState<RoadmapInput>({
    role: "",
    current_skills: "",
    target_timeline: "3 months",
    experience_level: "fresher",
  });
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof RoadmapInput, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    if (!form.role.trim() || !form.current_skills.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null);
    onLoading(true);

    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      onResult(json.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to generate roadmap.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <Card glow="emerald" className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 border border-emerald-400/20">
          <Map className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-white">Generate Your Roadmap</h3>
          <p className="text-xs text-zinc-500">Personalized daily + weekly plan to land your dream role</p>
        </div>
      </div>

      {/* Role */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
          Target Role <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
          placeholder="e.g. Frontend Developer, Data Scientist, DevOps Engineer"
          className="w-full rounded-xl border border-white/10 bg-coal-700 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:border-emerald-400/40 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 transition-colors"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
          Current Skills <span className="text-red-400">*</span>
        </label>
        <textarea
          value={form.current_skills}
          onChange={(e) => update("current_skills", e.target.value)}
          placeholder="e.g. HTML, CSS, basic JavaScript, some React tutorials…"
          rows={3}
          className="w-full resize-none rounded-xl border border-white/10 bg-coal-700 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:border-emerald-400/40 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Experience */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Experience Level
          </label>
          <div className="grid grid-cols-2 gap-2">
            {experienceLevels.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => update("experience_level", value)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                  form.experience_level === value
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                    : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Target Timeline
          </label>
          <select
            value={form.target_timeline}
            onChange={(e) => update("target_timeline", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-coal-700 px-4 py-3 text-sm text-zinc-200 focus:border-emerald-400/40 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 transition-colors appearance-none"
          >
            {timelines.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <Button size="lg" className="w-full" loading={loading} onClick={submit}>
        {loading ? "Generating Roadmap…" : "Generate My Roadmap"}
      </Button>
    </Card>
  );
}
