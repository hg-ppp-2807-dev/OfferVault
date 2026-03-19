-- ============================================================
-- PlaceCoach — Supabase Schema
-- Run this in the Supabase SQL editor to set up your tables.
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── Resume Analyses ──────────────────────────────────────────
create table if not exists public.resume_analyses (
  id            uuid primary key default gen_random_uuid(),
  score         integer not null check (score between 0 and 100),
  summary       text,
  mistakes_count integer default 0,
  improvements_count integer default 0,
  created_at    timestamptz default now()
);

-- ─── Interview Sessions ───────────────────────────────────────
create table if not exists public.interview_sessions (
  id            uuid primary key default gen_random_uuid(),
  role          text not null,
  question_count integer default 5,
  overall_score integer check (overall_score between 0 and 100),
  created_at    timestamptz default now()
);

-- ─── Roadmaps ─────────────────────────────────────────────────
create table if not exists public.roadmaps (
  id               uuid primary key default gen_random_uuid(),
  role             text not null,
  timeline         text,
  experience_level text,
  created_at       timestamptz default now()
);

-- ─── Row Level Security (optional — disable for quick start) ──
-- By default, tables are public. For production, enable RLS:

-- alter table public.resume_analyses enable row level security;
-- alter table public.interview_sessions enable row level security;
-- alter table public.roadmaps enable row level security;

-- ─── Indexes ──────────────────────────────────────────────────
create index if not exists idx_resume_analyses_created_at on public.resume_analyses(created_at desc);
create index if not exists idx_interview_sessions_created_at on public.interview_sessions(created_at desc);
create index if not exists idx_roadmaps_created_at on public.roadmaps(created_at desc);
