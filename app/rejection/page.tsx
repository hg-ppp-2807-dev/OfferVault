import { RejectionAnalyzer } from "@/components/rejection/RejectionAnalyzer";
import { XCircle } from "lucide-react";

export const metadata = { title: "Rejection Analyzer — OfferVault" };

export default function RejectionPage() {
  return (
    <div className="surface-card p-8 rounded-2xl shadow-md">
      <div className="flex items-center gap-2 mb-1">
        <XCircle className="h-5 w-5 text-red-400" />
        <h1 className="font-display text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Rejection Analyzer
        </h1>
        <span className="inline-flex items-center rounded-full border border-red-400/20 bg-red-400/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-red-400">
          Brutal Honest
        </span>
      </div>
      <p className="text-sm text-zinc-500">
        Find out exactly why you might get rejected — and how to fix it before
        it happens.
      </p>
      <RejectionAnalyzer />
    </div>
  );
}
