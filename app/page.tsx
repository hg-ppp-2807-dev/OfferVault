import Link from "next/link";
import { FileText, MessageSquare, Map, ArrowRight, Zap, TrendingUp, Clock, Sparkles, Star } from "lucide-react";

const features = [
    {
        href: "/resume",
        icon: FileText,
        title: "Resume Analyzer",
        description:
            "Upload your PDF resume and get an AI-powered score, mistake analysis, and targeted improvement suggestions.",
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
        description:
            "Practice with an AI interviewer that asks 5 tailored questions and gives you a detailed performance evaluation.",
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
        description:
            "Input your target role and current skills to get a personalized daily task list and weekly study plan.",
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
        <div className="relative space-y-12 md:space-y-14">
            {/* Ambient background glows for a richer landing feel */}
            <div className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="pointer-events-none absolute top-12 right-0 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" />

            {/* Hero */}
            <div className="relative overflow-hidden rounded-3xl border surface-card bg-gradient-to-br from-coal-100 to-zinc-50 dark:from-coal-800 dark:to-coal-900 p-8 md:p-12">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute -top-16 right-10 h-48 w-48 rounded-full bg-violet-400/15 blur-3xl" />
                <div className="absolute top-0 left-1/2 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-amber-300/15 blur-3xl" />

                <div className="relative z-10">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 backdrop-blur">
                        <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                        <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                            Powered by Groq x Llama 3
                        </span>
                    </div>

                    <h1 className="mb-4 font-display text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white md:text-6xl">
                        Crack Placements with
                        <br />
                        <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                            AI Precision
                        </span>
                    </h1>
                    <p className="mb-8 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-lg">
                        Analyze your resume, ace mock interviews, and get a personalized learning roadmap in one beautiful,
                        high-performance platform.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/resume"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-orange-300 px-5 py-2.5 text-sm font-display font-bold text-coal-950 transition-all duration-200 hover:scale-[1.02] hover:from-amber-200 hover:to-orange-200 shadow-amber-glow"
                        >
                            Get Started <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/interview"
                            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/80 px-5 py-2.5 text-sm font-display font-medium text-zinc-700 backdrop-blur transition-all duration-200 hover:border-zinc-300 hover:bg-white hover:text-zinc-900 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-white/25 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                            Try Mock Interview
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div
                        key={label}
                        className="rounded-2xl border surface-card p-4 text-center backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 dark:hover:border-white/20 dark:hover:bg-coal-800"
                    >
                        <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-coal-800">
                            <Icon className="h-4 w-4 text-amber-300" />
                        </div>
                        <p className="font-display text-lg font-bold text-zinc-900 dark:text-white">{value}</p>
                        <p className="mt-0.5 text-xs font-mono text-zinc-500 dark:text-zinc-400">{label}</p>
                    </div>
                ))}
            </div>

            {/* Feature cards */}
            <div>
                <div className="mb-5 flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-300" />
                    <h2 className="font-display text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-200">
                        Explore Core Modules
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {features.map(
                        ({ href, icon: Icon, title, description, badge, accentBg, accentBorder, accentText, hoverBorder }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`group flex items-start gap-5 rounded-2xl border surface-card bg-gradient-to-br from-coal-100 to-zinc-50 dark:from-coal-800 dark:to-coal-900 p-6 transition-all duration-200 ${hoverBorder} hover:-translate-y-0.5 hover:bg-zinc-50 dark:hover:bg-coal-700/80`}
                            >
                                <div
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${accentBg} ${accentBorder}`}
                                >
                                    <Icon className={`h-5 w-5 ${accentText}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="mb-1.5 flex items-center gap-2.5">
                                        <h3 className="text-lg font-display font-semibold text-zinc-900 dark:text-white transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-50">
                                            {title}
                                        </h3>
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${accentBg} ${accentBorder} ${accentText}`}
                                        >
                                            {badge}
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">{description}</p>
                                </div>
                                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-300" />
                            </Link>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
