"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, Badge, ErrorMessage } from "@/components/ui/index";
import { InterviewEvaluation } from "@/components/interview/InterviewEvaluation";
import { cn } from "@/lib/utils";
import type { InterviewMessage, InterviewEvaluation as EvalType } from "@/types";

const TOTAL_QUESTIONS = 5;

interface InterviewChatProps {
  role: string;
  onReset: () => void;
}

export function InterviewChat({ role, onReset }: InterviewChatProps) {
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<EvalType | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startInterview = async () => {
    setStarted(true);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, messages: [] }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      setMessages([{ role: "assistant", content: json.data.message, timestamp: new Date().toISOString() }]);
      setQuestionCount(1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to start interview.");
      setStarted(false);
    } finally {
      setLoading(false);
    }
  };

  const sendAnswer = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: InterviewMessage = {
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, messages: updatedMessages }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      const { message, completed, evaluation: eval_ } = json.data;

      if (completed && eval_) {
        setEvaluation(eval_);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Thank you for completing the interview! Here's your evaluation.", timestamp: new Date().toISOString() },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: message, timestamp: new Date().toISOString() },
        ]);
        setQuestionCount((q) => q + 1);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendAnswer();
    }
  };

  if (evaluation) {
    return <InterviewEvaluation evaluation={evaluation} role={role} onReset={onReset} />;
  }

  if (!started) {
    return (
      <Card glow="violet" className="flex flex-col items-center gap-6 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-400/10 border border-violet-400/20">
          <Bot className="h-8 w-8 text-violet-400" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-white mb-2">
            Ready for your {role} Interview?
          </h3>
          <p className="text-sm text-zinc-400 max-w-sm">
            You'll be asked {TOTAL_QUESTIONS} questions covering background, technical skills, and behavioral scenarios.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {["Background", "Technical", "Problem-Solving", "Behavioral", "Situational"].map((t) => (
            <Badge key={t} variant="violet">{t}</Badge>
          ))}
        </div>
        <Button size="lg" onClick={startInterview} loading={loading}>
          Start Interview
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10">
            <Bot className="h-4 w-4 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white font-display">{role} Interviewer</p>
            <p className="text-xs text-zinc-500">AI-powered mock interview</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 w-6 rounded-full transition-colors duration-300",
                  i < questionCount - 1 ? "bg-violet-400" : i === questionCount - 1 ? "bg-amber-400" : "bg-white/10"
                )}
              />
            ))}
          </div>
          <Badge variant="zinc">Q{Math.min(questionCount, TOTAL_QUESTIONS)}/{TOTAL_QUESTIONS}</Badge>
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3 animate-fade-up",
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                msg.role === "assistant"
                  ? "bg-violet-400/10 border border-violet-400/20"
                  : "bg-amber-400/10 border border-amber-400/20"
              )}
            >
              {msg.role === "assistant" ? (
                <Bot className="h-4 w-4 text-violet-400" />
              ) : (
                <User className="h-4 w-4 text-amber-400" />
              )}
            </div>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                msg.role === "assistant"
                  ? "bg-coal-700 text-zinc-200 rounded-tl-sm"
                  : "bg-amber-400/10 border border-amber-400/20 text-zinc-200 rounded-tr-sm"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-400/10 border border-violet-400/20">
              <Bot className="h-4 w-4 text-violet-400" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-coal-700 px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {error && <ErrorMessage message={error} />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/8 p-4">
        <div className="flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer… (Enter to send, Shift+Enter for newline)"
            rows={2}
            disabled={loading || !!evaluation}
            className="flex-1 resize-none rounded-xl border border-white/10 bg-coal-700 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:border-violet-400/40 focus:outline-none focus:ring-1 focus:ring-violet-400/20 transition-colors disabled:opacity-50"
          />
          <Button
            onClick={sendAnswer}
            disabled={!input.trim() || loading}
            size="md"
            className="h-[72px] px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
