"use client";

import { useState } from "react";
import {
  Calendar,
  Target,
  BookOpen,
  Layers,
  Flag,
  ExternalLink,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import { Card, Badge } from "@/components/ui/index";
import { Button } from "@/components/ui/Button";
import type { Roadmap, DailyTask, WeeklyPlan } from "@/types";

interface RoadmapDisplayProps {
  roadmap: Roadmap;
  onReset: () => void;
}

const resourceTypeColor: Record<string, "amber" | "emerald" | "violet" | "zinc"> = {
  course: "violet",
  book: "amber",
  tool: "emerald",
  practice: "zinc",
};

function DayCard({ task }: { task: DailyTask }) {
  const [open, setOpen] = useState(task.day <= 3);
  return (
    <div className="rounded-xl border border-white/8 bg-coal-800 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-xs font-mono font-bold text-amber-400">
            {task.day}
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">{task.title}</p>
            <p className="text-xs text-zinc-500">{task.focus_area}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Clock className="h-3 w-3" />
            {task.duration_hours}h
          </div>
          {open ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-white/5">
          <ul className="mt-3 space-y-2">
            {task.tasks.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function WeekCard({ plan }: { plan: WeeklyPlan }) {
  const [open, setOpen] = useState(plan.week === 1);
  return (
    <div className="rounded-xl border border-white/8 bg-coal-800 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-xs font-mono font-bold text-emerald-400">
            W{plan.week}
          </span>
          <p className="text-sm font-semibold text-white">{plan.theme}</p>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-white/5 space-y-4">
          {plan.goals.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-mono uppercase tracking-wide text-zinc-500 mb-2">Goals</p>
              <ul className="space-y-1.5">
                {plan.goals.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/60" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {plan.topics.length > 0 && (
            <div>
              <p className="text-xs font-mono uppercase tracking-wide text-zinc-500 mb-2">Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {plan.topics.map((t, i) => <Badge key={i} variant="zinc">{t}</Badge>)}
              </div>
            </div>
          )}
          {plan.projects.length > 0 && (
            <div>
              <p className="text-xs font-mono uppercase tracking-wide text-zinc-500 mb-2">Projects</p>
              <ul className="space-y-1">
                {plan.projects.map((p, i) => (
                  <li key={i} className="text-sm text-violet-300">▸ {p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function RoadmapDisplay({ roadmap, onReset }: RoadmapDisplayProps) {
  const [tab, setTab] = useState<"daily" | "weekly" | "milestones" | "resources">("daily");

  const tabs = [
    { key: "daily" as const, label: "Daily Tasks", icon: Calendar },
    { key: "weekly" as const, label: "Weekly Plan", icon: Layers },
    { key: "milestones" as const, label: "Milestones", icon: Flag },
    { key: "resources" as const, label: "Resources", icon: BookOpen },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <Card glow="emerald" className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 border border-emerald-400/20 shrink-0">
          <Target className="h-7 w-7 text-emerald-400" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="font-display text-2xl font-bold text-white">{roadmap.role} Roadmap</h2>
            <Badge variant="emerald">{roadmap.timeline}</Badge>
          </div>
          <p className="text-sm text-zinc-400 font-body leading-relaxed">{roadmap.overview}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset} className="shrink-0">
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> New Roadmap
        </Button>
      </Card>

      {/* Core Skills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-wide text-zinc-500">Core Skills:</span>
        {roadmap.core_skills?.map((skill, i) => (
          <Badge key={i} variant="amber">{skill}</Badge>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-coal-800 border border-white/8">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              tab === key
                ? "bg-coal-600 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "daily" && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500 font-mono">First 7 days — expand each to see tasks</p>
          {roadmap.daily_tasks?.map((task) => (
            <DayCard key={task.day} task={task} />
          ))}
        </div>
      )}

      {tab === "weekly" && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-500 font-mono">{roadmap.weekly_plans?.length} weeks planned</p>
          {roadmap.weekly_plans?.map((plan) => (
            <WeekCard key={plan.week} plan={plan} />
          ))}
        </div>
      )}

      {tab === "milestones" && (
        <div className="space-y-3">
          {roadmap.milestones?.map((m, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-white/8 bg-coal-800 p-4"
            >
              <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 border border-amber-400/20">
                <span className="text-xs font-mono font-bold text-amber-400">Wk {m.week}</span>
              </div>
              <div className="flex items-start gap-2 flex-1">
                <Flag className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p className="text-sm text-zinc-200">{m.milestone}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "resources" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roadmap.resources?.map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-coal-800 p-4 hover:border-white/15 transition-colors"
            >
              <BookOpen className="h-4 w-4 shrink-0 text-zinc-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{r.name}</p>
                <p className="text-xs text-zinc-500 truncate">{r.url}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={resourceTypeColor[r.type] ?? "zinc"}>{r.type}</Badge>
                {r.url.startsWith("http") && (
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-500 hover:text-zinc-200 transition-colors" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
