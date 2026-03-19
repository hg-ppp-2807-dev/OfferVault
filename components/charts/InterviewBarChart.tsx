"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { InterviewEvaluation } from "@/types";

interface InterviewBarChartProps {
  evaluation: InterviewEvaluation;
}

const COLORS = ["#a78bfa", "#60a5fa", "#34d399", "#fb923c"];

export function InterviewBarChart({ evaluation }: InterviewBarChartProps) {
  const chartData = [
    { name: "Communication", value: evaluation.communication },
    { name: "Technical", value: evaluation.technical_depth },
    { name: "Relevance", value: evaluation.relevance },
    { name: "Confidence", value: evaluation.confidence },
  ];

  return (
    <div className="rounded-xl border border-violet-400/20 bg-violet-400/5 p-4">
      <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Performance Breakdown</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#71717a", fontSize: 10, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#52525b", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.9} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
