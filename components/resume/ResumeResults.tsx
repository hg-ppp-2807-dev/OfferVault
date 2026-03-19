"use client";

import { AlertTriangle, TrendingUp, CheckCircle, Tag, RotateCcw } from "lucide-react";
import { Card, Badge, ScoreRing, Divider, ProgressBar } from "@/components/ui/index";
import { Button } from "@/components/ui/Button";
import { cn, scoreColor, scoreLabel, capitalize } from "@/lib/utils";
import type { ResumeAnalysis, ResumeIssue, ResumeImprovement } from "@/types";

interface ResumeResultsProps {
  analysis: ResumeAnalysis;
  onReset: () => void;
}

const severityVariant: Record<ResumeIssue["severity"], "red" | "amber" | "zinc"> = {
  high: "red",
  medium: "amber",
  low: "zinc",
};

const impactColor: Record<ResumeImprovement["impact"], string> = {
  high: "text-emerald-400",
  medium: "text-amber-400",
  low: "text-zinc-400",
};

export function ResumeResults({ analysis, onReset }: ResumeResultsProps) {
  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header score */}
      <Card glow="amber" className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <ScoreRing score={analysis.score} size={120} label="Score" />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
            <h2 className="font-display text-2xl font-bold text-white">
              Resume Score
            </h2>
            <Badge variant={analysis.score >= 80 ? "emerald" : analysis.score >= 60 ? "amber" : "red"}>
              {scoreLabel(analysis.score)}
            </Badge>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed font-body">{analysis.summary}</p>
          <Button variant="ghost" size="sm" onClick={onReset} className="mt-3 gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Analyze another
          </Button>
        </div>
      </Card>

      {/* Score breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "High Issues", value: analysis.mistakes.filter(m => m.severity === "high").length, color: "text-red-400", bg: "bg-red-400/10 border-red-400/15" },
          { label: "Med Issues", value: analysis.mistakes.filter(m => m.severity === "medium").length, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/15" },
          { label: "Improvements", value: analysis.improvements.length, color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/15" },
          { label: "Strengths", value: analysis.strengths.length, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/15" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={cn("rounded-xl border p-4 text-center", bg)}>
            <p className={cn("font-display text-3xl font-bold", color)}>{value}</p>
            <p className="mt-1 text-xs text-zinc-500 font-mono uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mistakes */}
        <Card>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </div>
            <h3 className="font-display font-semibold text-white">Issues Found</h3>
            <Badge variant="red" className="ml-auto">{analysis.mistakes.length}</Badge>
          </div>
          <div className="space-y-3">
            {analysis.mistakes.length === 0 ? (
              <p className="text-sm text-zinc-500">No major issues detected.</p>
            ) : (
              analysis.mistakes.map((issue, i) => (
                <div key={i} className="rounded-lg border border-white/5 bg-coal-900 p-3.5">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-sm font-semibold text-white">{issue.title}</p>
                    <Badge variant={severityVariant[issue.severity]}>{issue.severity}</Badge>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{issue.description}</p>
                  <Badge variant="zinc" className="mt-2">{issue.category}</Badge>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Improvements */}
        <Card>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10">
              <TrendingUp className="h-4 w-4 text-violet-400" />
            </div>
            <h3 className="font-display font-semibold text-white">Improvements</h3>
            <Badge variant="violet" className="ml-auto">{analysis.improvements.length}</Badge>
          </div>
          <div className="space-y-3">
            {analysis.improvements.map((imp, i) => (
              <div key={i} className="rounded-lg border border-white/5 bg-coal-900 p-3.5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="text-xs font-mono text-amber-400 uppercase tracking-wide">{imp.section}</p>
                  <span className={cn("text-xs font-medium", impactColor[imp.impact])}>
                    {imp.impact} impact
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mb-2 line-through">{imp.current}</p>
                <p className="text-xs text-zinc-200 leading-relaxed">→ {imp.suggested}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Strengths + Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
            </div>
            <h3 className="font-display font-semibold text-white">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10">
              <Tag className="h-4 w-4 text-amber-400" />
            </div>
            <h3 className="font-display font-semibold text-white">Missing Keywords</h3>
          </div>
          {analysis.keywords_missing.length === 0 ? (
            <p className="text-sm text-zinc-500">No critical keywords missing!</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {analysis.keywords_missing.map((kw, i) => (
                <Badge key={i} variant="amber">{kw}</Badge>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
