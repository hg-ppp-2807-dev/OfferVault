"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { ResumeUploader } from "@/components/resume/ResumeUploader";
import { ResumeResults } from "@/components/resume/ResumeResults";
import { Card, Skeleton } from "@/components/ui/index";
import type { ResumeAnalysis } from "@/types";

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="flex items-center gap-6">
        <Skeleton className="h-28 w-28 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Card>
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card className="space-y-3">
          <Skeleton className="h-5 w-32" />
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
        </Card>
        <Card className="space-y-3">
          <Skeleton className="h-5 w-32" />
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
        </Card>
      </div>
    </div>
  );
}

export default function ResumePage() {
  const [result, setResult] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const reset = () => setResult(null);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/20">
            <FileText className="h-4.5 w-4.5 text-amber-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Resume Analyzer</h1>
        </div>
        <p className="text-zinc-400 text-sm pl-12">
          Upload your PDF resume for an AI-powered audit — score, mistakes, and improvements.
        </p>
      </div>

      {/* Upload (only shown when no result) */}
      {!result && !loading && (
        <Card>
          <ResumeUploader
            onResult={setResult}
            onLoading={setLoading}
            loading={loading}
          />
        </Card>
      )}

      {/* Loading state */}
      {loading && <LoadingSkeleton />}

      {/* Results */}
      {result && !loading && (
        <ResumeResults analysis={result} onReset={reset} />
      )}
    </div>
  );
}
