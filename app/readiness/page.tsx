import { ReadinessChecker } from "@/components/readiness/ReadinessChecker";
import { Target } from "lucide-react";

export const metadata = { title: "Readiness Check — OfferVault" };

export default function ReadinessPage() {
  return (
    <div className="surface-card p-8 rounded-2xl shadow-md">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Target className="h-5 w-5 text-sky-400" />
          <h1 className="font-display text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            Readiness Evaluator
          </h1>
          <span className="inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-sky-400">
            Score-based
          </span>
        </div>
        <p className="text-sm text-zinc-500">
          Evaluate your overall placement readiness based on resume, interview, and
          skills.
        </p>
      </div>
      <ReadinessChecker />
    </div>
  );
}
