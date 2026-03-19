"use client";

import { Trophy, RotateCcw, TrendingUp, Zap } from "lucide-react";
import { Card, Badge, ScoreRing, ProgressBar } from "@/components/ui/index";
import { Button } from "@/components/ui/Button";
import { scoreLabel } from "@/lib/utils";
import type { InterviewEvaluation as EvalType } from "@/types";

interface InterviewEvaluationProps {
  evaluation: EvalType;
  role: string;
  onReset: () => void;
}

const metrics = [
  { key: "communication" as const, label: "Communication", color: "amber" as const },
  { key: "technical_depth" as const, label: "Technical Depth", color: "violet" as const },
  { key: "relevance" as const, label: "Relevance", color: "emerald" as const },
  { key: "confidence" as const, label: "Confidence", color: "amber" as const },
];

export function InterviewEvaluation({ evaluation, role, onReset }: InterviewEvaluationProps) {
  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <Card glow="violet" className="flex flex-col sm:flex-row items-center gap-6">
        <ScoreRing score={evaluation.overall_score} size={120} label="Score" />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start mb-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h2 className="font-display text-2xl font-bold text-white">Interview Complete!</h2>
            <Badge variant={evaluation.overall_score >= 70 ? "emerald" : "amber"}>
              {scoreLabel(evaluation.overall_score)}
            </Badge>
          </div>
          <p className="text-sm text-zinc-400 font-body leading-relaxed">
            You completed the mock <span className="text-white font-medium">{role}</span> interview.
          </p>
          <Button variant="ghost" size="sm" onClick={onReset} className="mt-3">
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Try Again
          </Button>
        </div>
      </Card>

      {/* Metrics */}
      <Card>
        <h3 className="font-display font-semibold text-white mb-5 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-400" /> Performance Breakdown
        </h3>
        <div className="space-y-4">
          {metrics.map(({ key, label, color }) => (
            <div key={key}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-zinc-300 font-body">{label}</span>
                <span className="text-sm font-mono font-semibold text-white">{evaluation[key]}</span>
              </div>
              <ProgressBar value={evaluation[key]} color={color} />
            </div>
          ))}
        </div>
      </Card>

      {/* Feedback */}
      <Card>
        <h3 className="font-display font-semibold text-white mb-3">Detailed Feedback</h3>
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line font-body">
          {evaluation.feedback}
        </p>
      </Card>

      {/* Strengths + Areas to Improve */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
            <span className="h-4 w-4 text-emerald-400">✓</span> What Went Well
          </h3>
          <ul className="space-y-2.5">
            {evaluation.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-amber-400" /> Areas to Improve
          </h3>
          <ul className="space-y-2.5">
            {evaluation.areas_to_improve.map((a, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                {a}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
