"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  MessageSquare,
  Map,
  Zap,
  LayoutDashboard,
  XCircle,
  Target,
  TrendingUp,
  Code2,
  BarChart2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/resume", label: "Resume Analyzer", icon: FileText },
  { href: "/interview", label: "Mock Interview", icon: MessageSquare },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
];

const navAdvanced = [
  { href: "/rejection", label: "Rejection Analyzer", icon: XCircle },
  { href: "/readiness", label: "Readiness Check", icon: Target },
  { href: "/predict", label: "Placement Predictor", icon: TrendingUp },
  { href: "/project", label: "Project Suggester", icon: Code2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-zinc-200 bg-white dark:border-white/8 dark:bg-coal-900">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-zinc-200 px-5 dark:border-white/8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400">
          <Zap className="h-4 w-4 text-coal-950" strokeWidth={2.5} />
        </div>
        <span className="font-display text-base font-bold tracking-tight text-zinc-900 dark:text-white">
          OfferVault
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        <div className="space-y-0.5">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-amber-400/10 text-amber-500 dark:text-amber-400"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-white/5 dark:hover:text-zinc-200"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    active ? "text-amber-500 dark:text-amber-400" : "text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-600 dark:group-hover:text-zinc-300"
                  )}
                />
                {label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-400" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Advanced tools */}
        <div>
          <p className="mb-1.5 px-3 text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-700">Advanced</p>
          <div className="space-y-0.5">
            {navAdvanced.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-violet-400/10 text-violet-500 dark:text-violet-400"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-white/5 dark:hover:text-zinc-200"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      active ? "text-violet-500 dark:text-violet-400" : "text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-600 dark:group-hover:text-zinc-300"
                    )}
                  />
                  {label}
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-200 px-5 py-4 dark:border-white/8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-600">v1.0.0 · Powered by Ollama</p>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
