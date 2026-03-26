"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { CategoryScores } from "@/types";

interface ResumeRadarProps {
  data: CategoryScores;
}

export function ResumeRadar({ data }: ResumeRadarProps) {
  const chartData = [
    { subject: "Content", value: data.content },
    { subject: "ATS", value: data.ats },
    { subject: "Structure", value: data.structure },
    { subject: "Grammar", value: data.grammar },
    { subject: "Impact", value: data.impact },
  ];

  return (
    <div className="surface-card p-4 rounded-xl shadow-md">
      <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Category Breakdown</p>
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#71717a", fontSize: 11, fontFamily: "monospace" }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "#52525b", fontSize: 10 }}
          />
          <Tooltip
            contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
            itemStyle={{ color: "#fbbf24" }}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#fbbf24"
            fill="#fbbf24"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
      {/* Legend row */}
      <div className="mt-2 grid grid-cols-5 gap-1">
        {chartData.map(({ subject, value }) => (
          <div key={subject} className="text-center">
            <p className="text-xs font-bold text-amber-400">{value}</p>
            <p className="text-[9px] font-mono text-zinc-600 uppercase">{subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
