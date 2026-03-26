"use client";

import { useState } from "react";
import { Map } from "lucide-react";
import { RoadmapForm } from "@/components/roadmap/RoadmapForm";
import { RoadmapDisplay } from "@/components/roadmap/RoadmapDisplay";
import { Card, Skeleton } from "@/components/ui/index";
import type { Roadmap } from "@/types";

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </Card>
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-6 w-20 rounded-full" />)}
      </div>
      <Skeleton className="h-12 rounded-xl" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);

  const reset = () => setRoadmap(null);

  return (
    <div className="surface-card p-8 rounded-2xl shadow-md">
      <div className="space-y-8">
        {/* Page header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 border border-emerald-400/20">
              <Map className="h-4.5 w-4.5 text-emerald-400" />
            </div>
            <h1 className="font-display text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              Roadmap Generator
            </h1>
          </div>
          <p className="text-zinc-400 text-sm pl-12">
            Generate a personalized daily and weekly plan to land your target role.
          </p>
        </div>

        {/* Form or results */}
        {!roadmap && !loading && (
          <RoadmapForm
            onResult={setRoadmap}
            onLoading={setLoading}
            loading={loading}
          />
        )}

        {loading && <LoadingSkeleton />}

        {roadmap && !loading && (
          <RoadmapDisplay roadmap={roadmap} onReset={reset} />
        )}
      </div>
    </div>
  );
}
