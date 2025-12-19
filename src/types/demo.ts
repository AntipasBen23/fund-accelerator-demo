export type PersonaId = "preseed_vc" | "angel" | "impact";

export type JobStage =
  | "queued"
  | "parsing"
  | "scoring"
  | "rewrites"
  | "benchmarks"
  | "finalizing"
  | "done"
  | "error";

export type SlideType =
  | "title"
  | "problem"
  | "solution"
  | "market"
  | "traction"
  | "gtm"
  | "competition"
  | "business_model"
  | "team"
  | "ask"
  | "other";

export type Deck = {
  id: string;
  name: string;
  createdAt: number;
  slideCount: number;
  slides: Array<{
    id: string;
    title: string;
    type: SlideType;
    text: string;
  }>;
};

export type SlideFinding = {
  slideId: string;
  score: number; // 0-100
  strengths: string[];
  issues: string[];
  rewrites: {
    headline?: string;
    bullets?: string[];
  };
  investorQuestions: string[];
};

export type Analysis = {
  id: string;
  deckId: string;
  persona: PersonaId;
  createdAt: number;
  overallScore: number;
  categoryScores: Record<
    "clarity" | "traction" | "market" | "team" | "moat",
    number
  >;
  percentile: number; // 0-100
  topBlockers: string[];
  findings: SlideFinding[];
};

export type Job = {
  id: string;
  deckId: string;
  persona: PersonaId;
  stage: JobStage;
  progress: number; // 0-100
  message: string;
  error?: string;
  analysisId?: string;
};
