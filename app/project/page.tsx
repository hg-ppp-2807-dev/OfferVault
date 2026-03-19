import { ProjectSuggester } from "@/components/project/ProjectSuggester";
import { Code2 } from "lucide-react";

export const metadata = { title: "Project Suggester — OfferVault" };

export default function ProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Code2 className="h-5 w-5 text-emerald-400" />
          <h1 className="font-display text-2xl font-bold text-white">Project Suggester</h1>
          <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400">Portfolio</span>
        </div>
        <p className="text-sm text-zinc-500">Get a strong portfolio project idea tailored to your target role and existing skills.</p>
      </div>
      <ProjectSuggester />
    </div>
  );
}
