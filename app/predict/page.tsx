import { PredictionDashboard } from "@/components/predict/PredictionDashboard";
import { TrendingUp } from "lucide-react";

export const metadata = { title: "Placement Predictor — OfferVault" };

export default function PredictPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5 text-violet-400" />
          <h1 className="font-display text-2xl font-bold text-white">Placement Predictor</h1>
          <span className="inline-flex items-center rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-violet-400">AI Prediction</span>
        </div>
        <p className="text-sm text-zinc-500">Get a realistic prediction of your placement chances and timeline.</p>
      </div>
      <PredictionDashboard />
    </div>
  );
}
