"use client";

interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillHeatmapProps {
  skills: Skill[];
  title?: string;
}

function getColor(level: number): { bg: string; text: string; border: string } {
  if (level >= 70) return { bg: "bg-emerald-400/15", text: "text-emerald-400", border: "border-emerald-400/25" };
  if (level >= 40) return { bg: "bg-amber-400/15", text: "text-amber-400", border: "border-amber-400/25" };
  return { bg: "bg-red-400/15", text: "text-red-400", border: "border-red-400/25" };
}

function getLabel(level: number): string {
  if (level >= 70) return "Strong";
  if (level >= 40) return "Medium";
  return "Gap";
}

export function SkillHeatmap({ skills, title = "Skill Gap Analysis" }: SkillHeatmapProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/8 bg-coal-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{title}</p>
        <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-600">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400 inline-block" /> Gap</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400 inline-block" /> Medium</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" /> Strong</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {skills.map(({ name, level }) => {
          const { bg, text, border } = getColor(level);
          return (
            <div key={name} className="flex items-center gap-3">
              <div className={`rounded-md border px-2 py-0.5 text-xs font-mono ${bg} ${text} ${border} shrink-0 w-32 text-center`}>
                {name}
              </div>
              <div className="flex-1 h-2 rounded-full bg-coal-900 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${bg.replace("/15", "/80")}`}
                  style={{ width: `${level}%` }}
                />
              </div>
              <span className={`text-xs font-mono ${text} w-12 text-right`}>
                {level}% <span className="text-zinc-700">({getLabel(level)})</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
