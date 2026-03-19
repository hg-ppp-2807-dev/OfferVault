import Link from "next/link";
import { FileText, MessageSquare, Map, ArrowRight, Zap, TrendingUp, Clock } from "lucide-react";

const features = [
  {
    href: "/resume",
    icon: FileText,
    title: "Resume Analyzer",
    description: "Upload your PDF resume and get an AI-powered score, mistake analysis, and targeted improvement suggestions.",
    color: "amber",
    badge: "AI Scoring",
    accentBg: "bg-amber-400/10",
    accentBorder: "border-amber-400/20",
    accentText: "text-amber-400",
    hoverBorder: "hover:border-amber-400/30",
  },
  {
    href: "/interview",
    icon: MessageSquare,
    title: "Mock Interview",
    description: "Practice with an AI interviewer that asks 5 tailored questions and gives you a detailed performance evaluation.",
    color: "violet",
    badge: "Interactive",
    accentBg: "bg-violet-400/10",
    accentBorder: "border-violet-400/20",
    accentText: "text-violet-400",
    hoverBorder: "hover:border-violet-400/30",
  },
  {
    href: "/roadmap",
    icon: Map,
    title: "Roadmap Generator",
    description: "Input your target role and current skills to get a personalized daily task list and weekly study plan.",
    color: "emerald",
    badge: "Personalized",
    accentBg: "bg-emerald-400/10",
    accentBorder: "border-emerald-400/20",
    accentText: "text-emerald-400",
    hoverBorder: "hover:border-emerald-400/30",
  },
];

const stats = [
  { label: "AI Model", value: "Llama 3 70B", icon: Zap },
  { label: "Avg Analysis Time", value: "~8 seconds", icon: Clock },
  { label: "Features", value: "3 Modules", icon: TrendingUp },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="relative rounded-2xl border border-white/8 bg-coal-800 overflow-hidden p-8 md:p-12">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-50" />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-96 bg-amber-400/10 blur-3xl rounded-full" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1.5 mb-6">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              Powered by Groq × Llama 3
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Your AI-Powered
            <br />
            <span className="text-amber-400">Placement Coach</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed mb-8">
            Analyze your resume, ace mock interviews, and get a personalized learning roadmap — all powered by cutting-edge AI.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-display font-bold text-coal-950 hover:bg-amber-300 transition-colors shadow-amber-glow"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/interview"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-display font-medium text-zinc-300 hover:border-white/20 hover:text-white transition-colors"
            >
              Try Mock Interview
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-white/8 bg-coal-800 p-4 text-center">
            <Icon className="h-4 w-4 text-zinc-500 mx-auto mb-2" />
            <p className="font-display text-lg font-bold text-white">{value}</p>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div>
        <h2 className="font-display text-lg font-semibold text-zinc-300 mb-5 tracking-tight">
          What can I do?
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {features.map(({ href, icon: Icon, title, description, badge, accentBg, accentBorder, accentText, hoverBorder }) => (
            <Link
              key={href}
              href={href}
              className={`group flex items-start gap-5 rounded-xl border border-white/8 bg-coal-800 p-6 transition-all duration-200 ${hoverBorder} hover:bg-coal-700`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${accentBg} ${accentBorder}`}>
                <Icon className={`h-5 w-5 ${accentText}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h3 className="font-display font-semibold text-white text-lg group-hover:text-amber-50 transition-colors">
                    {title}
                  </h3>
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${accentBg} ${accentBorder} ${accentText}`}>
                    {badge}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
