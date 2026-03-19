"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/index";
import type { ResumeAnalysis } from "@/types";

interface ResumeUploaderProps {
  onResult: (result: ResumeAnalysis) => void;
  onLoading: (loading: boolean) => void;
  loading: boolean;
}

export function ResumeUploader({ onResult, onLoading, loading }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    setError(null);
    if (accepted[0]) setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: (files) => {
      const reason = files[0]?.errors[0]?.message ?? "Invalid file";
      setError(reason);
    },
  });

  const analyze = async () => {
    if (!file) return;
    setError(null);
    onLoading(true);

    try {
      const fd = new FormData();
      fd.append("resume", file);

      const res = await fetch("/api/analyze-resume", { method: "POST", body: fd });
      const json = await res.json();

      if (!json.success) throw new Error(json.error);
      onResult(json.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      onLoading(false);
    }
  };

  const clear = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all duration-200",
          isDragActive
            ? "border-amber-400 bg-amber-400/5"
            : file
            ? "border-emerald-400/40 bg-emerald-400/5"
            : "border-white/10 hover:border-white/20 hover:bg-white/3"
        )}
      >
        <input {...getInputProps()} />

        {file ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="font-display font-semibold text-white">{file.name}</p>
              <p className="mt-0.5 text-sm text-zinc-500">
                {(file.size / 1024).toFixed(0)} KB · PDF
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400 transition-colors"
            >
              <X className="h-3 w-3" /> Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
              {isDragActive ? (
                <Upload className="h-6 w-6 text-amber-400" />
              ) : (
                <FileText className="h-6 w-6 text-zinc-400" />
              )}
            </div>
            <div>
              <p className="font-display font-semibold text-white">
                {isDragActive ? "Drop your resume here" : "Upload your resume"}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Drag & drop or click to browse · PDF only · Max 5 MB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      <Button
        size="lg"
        className="w-full"
        disabled={!file || loading}
        loading={loading}
        onClick={analyze}
      >
        {loading ? "Analyzing…" : "Analyze Resume"}
      </Button>
    </div>
  );
}
