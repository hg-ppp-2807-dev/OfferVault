"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { InterviewChat } from "@/components/interview/InterviewChat";
import { Card, Badge } from "@/components/ui/index";
import { Button } from "@/components/ui/Button";

const suggestedRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Product Manager",
    "UI/UX Designer",
    "Android Developer",
    "Cloud Engineer",
];

export default function InterviewPage() {
    const [role, setRole] = useState("");
    const [activeRole, setActiveRole] = useState<string | null>(null);

    const start = () => {
        const r = role.trim();
        if (r) setActiveRole(r);
    };

    const reset = () => {
        setActiveRole(null);
        setRole("");
    };

    return (
        <div className="surface-card p-8 rounded-2xl shadow-md">
            <div className="space-y-8">
                {/* Page header */}
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10 border border-violet-400/20">
                            <MessageSquare className="h-4.5 w-4.5 text-violet-400" />
                        </div>
                        <h1 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                            Mock Interview
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-sm pl-12">
                        AI-driven interview with 5 questions and a full performance
                        evaluation at the end.
                    </p>
                </div>

                {/* Role selector */}
                {!activeRole ? (
                    <Card glow="violet" className="space-y-6">
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                                Target Role <span className="text-red-400">*</span>
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && start()}
                                    placeholder="e.g. Full Stack Developer, Data Analyst…"
                                    className="flex-1 rounded-xl border border-white/10 bg-coal-700 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:border-violet-400/40 focus:outline-none focus:ring-1 focus:ring-violet-400/20 transition-colors"
                                />
                                <Button
                                    size="md"
                                    onClick={start}
                                    disabled={!role.trim()}
                                    className="px-6"
                                >
                                    Start
                                </Button>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                                Suggested Roles
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedRoles.map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRole(r)}
                                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                                            role === r
                                                ? "border-violet-400/40 bg-violet-400/10 text-violet-400"
                                                : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                                        }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/8 bg-coal-900 p-4 space-y-2">
                            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wide">
                                What to expect
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                                {[
                                    { n: "5", label: "Questions asked" },
                                    { n: "AI", label: "Real-time evaluation" },
                                    { n: "4", label: "Metrics scored" },
                                ].map(({ n, label }) => (
                                    <div key={label} className="text-center">
                                        <p className="font-display text-xl font-bold text-violet-400">
                                            {n}
                                        </p>
                                        <p className="text-xs text-zinc-500 mt-0.5">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card className="p-0 overflow-hidden">
                        <InterviewChat role={activeRole} onReset={reset} />
                    </Card>
                )}
            </div>
        </div>
    );
}
