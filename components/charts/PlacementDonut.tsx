"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PlacementDonutProps {
  score: number;
  label?: string;
  color?: string;
}

export function PlacementDonut({ score, label = "Score", color = "#a78bfa" }: PlacementDonutProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const data = [
    { name: label, value: clamped },
    { name: "Remaining", value: 100 - clamped },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={52}
              outerRadius={72}
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            >
              <Cell fill={color} fillOpacity={0.9} />
              <Cell fill="rgba(255,255,255,0.05)" />
            </Pie>
            <Tooltip
              contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Centre text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display text-2xl font-bold text-white">{clamped}</span>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>
        </div>
      </div>
    </div>
  );
}
