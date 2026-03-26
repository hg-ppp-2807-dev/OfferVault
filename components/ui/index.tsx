import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

// ─── Card ────────────────────────────────────────────────────────────────────

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "amber" | "violet" | "emerald" | "none";
}

export function Card({ children, className = "", glow }: { children: React.ReactNode; className?: string; glow?: "amber" | "violet" | "emerald" }) {
  return (
    <div
      className={
        cn(
          "surface-card rounded-2xl shadow-md",
          glow === "amber" && "shadow-amber-glow",
          glow === "violet" && "shadow-violet-glow",
          glow === "emerald" && "shadow-emerald-glow",
          className
        )
      }
    >
      {children}
    </div>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "amber" | "emerald" | "violet" | "red" | "zinc";
}

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-surface bg-card text-card px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider", className)}>
      {children}
    </span>
  );
}

// ─── ScoreRing ────────────────────────────────────────────────────────────────

export function ScoreRing({
  score,
  size = 120,
  label,
}: {
  score: number;
  size?: number;
  label?: string;
}) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (score / 100) * circumference;

  const color =
    score >= 80 ? "#34d399" : score >= 60 ? "#fbbf24" : "#f87171";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={6}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circumference}`}
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold text-white">{score}</span>
        {label && <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>}
      </div>
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-white/8", className)} />;
}

// ─── SectionTitle ─────────────────────────────────────────────────────────────

export function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-3xl font-bold text-white tracking-tight">{children}</h1>
      {sub && <p className="mt-2 text-zinc-400 font-body">{sub}</p>}
    </div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-white/5 via-white/8 to-white/5",
        className
      )}
    />
  );
}

// ─── ErrorMessage ─────────────────────────────────────────────────────────────

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
      <span className="mt-0.5 text-red-400">⚠</span>
      <p className="text-sm text-red-300 font-body">{message}</p>
    </div>
  );
}

// ─── ProgressBar ──────────────────────────────────────────────────────────────

export function ProgressBar({ value, color = "amber" }: { value: number; color?: "amber" | "emerald" | "violet" }) {
  const colors = {
    amber: "bg-amber-400",
    emerald: "bg-emerald-400",
    violet: "bg-violet-400",
  };
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className={cn("h-full rounded-full transition-all duration-1000", colors[color])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
