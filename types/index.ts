// ─── Resume ──────────────────────────────────────────────────────────────────

export interface CategoryScores {
  content: number;
  ats: number;
  structure: number;
  grammar: number;
  impact: number;
}

export interface ResumeAnalysis {
  score: number; // 0–100
  summary: string;
  category_scores?: CategoryScores;
  mistakes: ResumeIssue[];
  improvements: ResumeImprovement[];
  strengths: string[];
  keywords_missing: string[];
}

export interface ResumeIssue {
  category: "formatting" | "content" | "ats" | "grammar" | "structure";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
}

export interface ResumeImprovement {
  section: string;
  current: string;
  suggested: string;
  impact: "high" | "medium" | "low";
}

// ─── Interview ───────────────────────────────────────────────────────────────

export interface InterviewMessage {
  role: "assistant" | "user";
  content: string;
  timestamp?: string;
}

export interface InterviewEvaluation {
  overall_score: number;
  communication: number;
  technical_depth: number;
  relevance: number;
  confidence: number;
  feedback: string;
  strengths: string[];
  areas_to_improve: string[];
}

export interface InterviewSession {
  id: string;
  role: string;
  messages: InterviewMessage[];
  evaluation?: InterviewEvaluation;
  question_count: number;
  completed: boolean;
}

// ─── Roadmap ─────────────────────────────────────────────────────────────────

export interface RoadmapInput {
  role: string;
  current_skills: string;
  target_timeline: string; // e.g. "3 months", "6 months"
  experience_level: "fresher" | "junior" | "mid" | "senior";
}

export interface DailyTask {
  day: number;
  title: string;
  tasks: string[];
  focus_area: string;
  duration_hours: number;
}

export interface WeeklyPlan {
  week: number;
  theme: string;
  goals: string[];
  topics: string[];
  projects: string[];
  resources: string[];
}

export interface Roadmap {
  role: string;
  timeline: string;
  overview: string;
  core_skills: string[];
  daily_tasks: DailyTask[];
  weekly_plans: WeeklyPlan[];
  milestones: { week: number; milestone: string }[];
  resources: { name: string; url: string; type: "course" | "book" | "tool" | "practice" }[];
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// ─── Rejection Analysis ───────────────────────────────────────────────────────

export interface RejectionAnalysis {
  rejection_score: number;
  verdict: string;
  reasons: string[];
  missing_skills: string[];
  red_flags: string[];
  fix_plan: string[];
}

// ─── Readiness Evaluation ────────────────────────────────────────────────────

export interface ReadinessResult {
  readiness_score: number;
  level: "Not Ready" | "Partially Ready" | "Almost Ready" | "Ready";
  strengths: string[];
  weaknesses: string[];
  next_actions: string[];
}

// ─── Placement Prediction ────────────────────────────────────────────────────

export interface PredictionResult {
  placement_chance: "Low" | "Medium" | "High" | "Very High";
  confidence_level: string;
  estimated_days: number;
  risks: string[];
  actions: string[];
}

// ─── Project Suggestion ──────────────────────────────────────────────────────

export interface ProjectSuggestion {
  title: string;
  description: string;
  tech_stack: string[];
  features: string[];
  impact: string;
}

