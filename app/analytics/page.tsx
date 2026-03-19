import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { BarChart2 } from "lucide-react";

export const metadata = { title: "Analytics Dashboard — OfferVault" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 className="h-5 w-5 text-sky-400" />
          <h1 className="font-display text-2xl font-bold text-white">Analytics Dashboard</h1>
          <span className="inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-sky-400">Live Charts</span>
        </div>
        <p className="text-sm text-zinc-500">Visual intelligence — radar, bar, donut charts and skill gap heatmap in one view.</p>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}
