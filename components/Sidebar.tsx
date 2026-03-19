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
} from "lucide-react";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/resume", label: "Resume Analyzer", icon: FileText },
  { href: "/interview", label: "Mock Interview", icon: MessageSquare },
  { href: "/roadmap", label: "Roadmap", icon: Map },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-white/8 bg-coal-900">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-white/8 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400">
          <Zap className="h-4 w-4 text-coal-950" strokeWidth={2.5} />
        </div>
        <span className="font-display text-base font-bold text-white tracking-tight">
          PlaceCoach
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-amber-400/10 text-amber-400"
                  : "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  active ? "text-amber-400" : "text-zinc-600 group-hover:text-zinc-300"
                )}
              />
              {label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/8 px-5 py-4">
        <p className="text-xs text-zinc-600 font-mono">v1.0.0 · Powered by Ollama</p>
      </div>
    </aside>
  );
}
