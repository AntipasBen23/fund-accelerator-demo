import { Analysis, Deck, PersonaId, SlideType } from "@/types/demo";

export const PERSONAS: Array<{
  id: PersonaId;
  name: string;
  summary: string;
  emphasis: string[];
}> = [
  {
    id: "preseed_vc",
    name: "UK Pre-seed VC",
    summary: "Wants crisp wedge, clear GTM, and believable early traction signals.",
    emphasis: ["Clarity", "GTM", "Why now", "Wedge", "Momentum"],
  },
  {
    id: "angel",
    name: "Angel Investor",
    summary: "Optimizes for founder-market fit, speed, and story. Loves proof of hustle.",
    emphasis: ["Founder story", "Velocity", "Distribution", "Early users"],
  },
  {
    id: "impact",
    name: "Impact / ESG",
    summary: "Needs measurable outcomes and defensible impact claims—less vibes, more metrics.",
    emphasis: ["Impact metrics", "Governance", "Outcomes", "Sustainability"],
  },
];

export const SAMPLE_DECKS: Deck[] = [
  {
    id: "deck_sample_1",
    name: "Sample: B2B SaaS (Underestimated Founder)",
    createdAt: Date.now() - 1000 * 60 * 60 * 10,
    slideCount: 11,
    slides: [
      {
        id: "s1",
        title: "Title",
        type: "title",
        text: "CompanyName — The fastest way for small teams to ship compliance-ready features.",
      },
      {
        id: "s2",
        title: "Problem",
        type: "problem",
        text: "SMBs lose deals because enterprise buyers demand compliance proof. Teams waste weeks on audits and docs, delaying revenue.",
      },
      {
        id: "s3",
        title: "Solution",
        type: "solution",
        text: "A compliance automation layer that generates evidence, policies, and audits in days, not weeks.",
      },
      {
        id: "s4",
        title: "Market",
        type: "market",
        text: "TAM: £Xbn global compliance tooling. Initial wedge: UK/EU B2B SaaS selling to mid-market.",
      },
      {
        id: "s5",
        title: "Traction",
        type: "traction",
        text: "Pilot customers: 6. Revenue: £4k MRR. Pipeline: 22. Time-to-audit reduced from 5 weeks to 6 days.",
      },
      {
        id: "s6",
        title: "GTM",
        type: "gtm",
        text: "Founder-led sales + partnerships with agencies. Content targeting 'SOC2 for SMB'.",
      },
      {
        id: "s7",
        title: "Competition",
        type: "competition",
        text: "Alternatives: spreadsheets, consultants, generic GRC platforms. We win on speed + SMB-first workflows.",
      },
      {
        id: "s8",
        title: "Business Model",
        type: "business_model",
        text: "SaaS pricing: £399–£1,499/mo based on seats and audit scope. Add-ons: agency dashboards.",
      },
      {
        id: "s9",
        title: "Moat",
        type: "other",
        text: "Workflow data flywheel + templates + integrations. Vertical playbooks by industry.",
      },
      {
        id: "s10",
        title: "Team",
        type: "team",
        text: "CEO: domain operator. CTO: infra + security. Advisors: compliance + procurement.",
      },
      {
        id: "s11",
        title: "Ask",
        type: "ask",
        text: "Raising £500k pre-seed to hit £30k MRR and expand integrations. 12-month runway.",
      },
    ],
  },
];

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function seededRand(seed: number) {
  // deterministic pseudo-random 0..1
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const SLIDE_HINTS: Record<SlideType, { strengths: string[]; issues: string[]; rewrite: string[]; questions: string[] }> = {
  title: {
    strengths: ["Clear positioning", "Simple headline"],
    issues: ["Add a concrete outcome metric", "Make the target customer explicit"],
    rewrite: ["Who it's for + what you replace", "One measurable promise"],
    questions: ["What is the 1-sentence category you want to own?"],
  },
  problem: {
    strengths: ["Pain is understandable", "Ties to revenue loss"],
    issues: ["Quantify frequency & cost", "Name the buyer and user separately"],
    rewrite: ["Add one shocking stat", "Make the pain inevitable"],
    questions: ["How do you know this is a top-3 problem for your ICP?"],
  },
  solution: {
    strengths: ["Direct mapping to problem", "Outcome-focused"],
    issues: ["Explain 'how' at a high level", "Show before/after workflow"],
    rewrite: ["3-step workflow", "One demo-able feature highlight"],
    questions: ["Why is your approach 10x better—not 10%?"],
  },
  market: {
    strengths: ["Mentions wedge", "Shows scope"],
    issues: ["Replace TAM fluff with bottom-up wedge math", "Define ICP precisely"],
    rewrite: ["Wedge first, then expand", "Bottom-up market sizing"],
    questions: ["What is your initial beachhead and why will you win there?"],
  },
  traction: {
    strengths: ["Has numbers", "Shows time reduction"],
    issues: ["Add retention or usage frequency", "Clarify conversion funnel"],
    rewrite: ["Add one growth chart headline", "Include strongest customer proof"],
    questions: ["What is your strongest proof that users would be sad if you disappeared?"],
  },
  gtm: {
    strengths: ["Founder-led sales fits stage", "Partnership angle is good"],
    issues: ["Show repeatable channel test results", "Define sales cycle + ACV"],
    rewrite: ["Channel experiments + learnings", "Repeatable outbound wedge"],
    questions: ["What distribution advantage do you have that others can’t copy quickly?"],
  },
  competition: {
    strengths: ["Clear alternatives", "Defines win condition"],
    issues: ["Add 'why now' vs incumbents", "Show differentiation in one line matrix"],
    rewrite: ["2x2 positioning", "Competitor comparison table (simple)"],
    questions: ["Why won’t a big player crush you in 6 months?"],
  },
  business_model: {
    strengths: ["Simple pricing", "Clear add-ons"],
    issues: ["Tie pricing to ROI", "Show gross margin assumptions"],
    rewrite: ["ROI-based pricing story", "Expansion levers"],
    questions: ["How does pricing map to value delivered?"],
  },
  team: {
    strengths: ["Roles are clear", "Advisors add credibility"],
    issues: ["Add founder-market fit evidence", "Show what you’ve built before"],
    rewrite: ["1-line achievements each", "Why this team wins"],
    questions: ["Why are you uniquely positioned to solve this?"],
  },
  ask: {
    strengths: ["Clear amount", "Clear runway"],
    issues: ["Tie spend to milestones", "Define next fundable proof points"],
    rewrite: ["Milestones → use of funds", "What 'success' looks like in 6 months"],
    questions: ["What concrete milestones will this round unlock?"],
  },
  moat: {
    strengths: ["Mentions flywheel", "Notes integrations"],
    issues: ["Make moat specific at this stage", "Explain data advantage clearly"],
    rewrite: ["What gets better with scale", "Switching costs"],
    questions: ["What compounds every week you exist?"],
  },
  other: {
    strengths: ["Has a claim", "Points to defensibility"],
    issues: ["Make claims testable", "Remove vague wording"],
    rewrite: ["Turn claims into metrics", "Add proof/experiment"],
    questions: ["What would convince a skeptic that this is true?"],
  },
};

export function generateAnalysis(deck: Deck, persona: PersonaId): Analysis {
  const seed = hashString(deck.id + ":" + persona);
  const base = 58 + Math.floor(seededRand(seed + 1) * 18); // 58-75
  const personaBias =
    persona === "preseed_vc" ? 0 : persona === "angel" ? 2 : -1;

  const categoryScores = {
    clarity: Math.min(100, base + personaBias + Math.floor(seededRand(seed + 2) * 10)),
    traction: Math.min(100, base - 4 + Math.floor(seededRand(seed + 3) * 14)),
    market: Math.min(100, base - 2 + Math.floor(seededRand(seed + 4) * 12)),
    team: Math.min(100, base + Math.floor(seededRand(seed + 5) * 10)),
    moat: Math.min(100, base - 6 + Math.floor(seededRand(seed + 6) * 14)),
  };

  const overallScore = Math.round(
    (categoryScores.clarity * 0.25 +
      categoryScores.traction * 0.25 +
      categoryScores.market * 0.20 +
      categoryScores.team * 0.15 +
      categoryScores.moat * 0.15)
  );

  const percentile = Math.max(15, Math.min(92, Math.round(overallScore + (seededRand(seed + 7) * 18 - 9))));

  const topBlockersPool = [
    "Traction slide needs 1 killer proof point (retention/usage/ROI).",
    "Market sizing feels top-down—show bottom-up wedge math.",
    "GTM is plausible but not yet repeatable—add channel experiments + results.",
    "Moat claims are vague—turn them into compounding advantages + evidence.",
    "Ask should map spend → milestones → next fundable proof points.",
  ];

  const findings = deck.slides.map((sl, i) => {
    const h = hashString(sl.id + ":" + persona);
    const jitter = Math.floor(seededRand(h + 1) * 18) - 8; // -8..+9
    const slideBase = Math.max(35, Math.min(92, overallScore + jitter));

    const hints = SLIDE_HINTS[sl.type] ?? SLIDE_HINTS.other;

    const personaExtra =
      persona === "impact"
        ? ["Add measurable outcomes + verification method."]
        : persona === "angel"
          ? ["Add founder story + momentum signal."]
          : ["Add wedge clarity + sales cycle/ACV."];

    return {
      slideId: sl.id,
      score: slideBase,
      strengths: hints.strengths.slice(0, 2),
      issues: [...hints.issues.slice(0, 2), ...personaExtra.slice(0, 1)],
      rewrites: {
        headline: `${sl.title}: sharper, more investor-ready headline`,
        bullets: [
          `Make it specific: name buyer/user + quantify outcome.`,
          `Add one proof point (metric, quote, or before/after).`,
          `Remove vague words; replace with measurable claims.`,
        ],
      },
      investorQuestions: hints.questions.concat(
        persona === "preseed_vc"
          ? ["What’s the wedge that lets you win cheaply?"]
          : persona === "angel"
            ? ["What’s the scrappiest path to your next 10 customers?"]
            : ["How will you measure impact quarterly, not annually?"]
      ),
    };
  });

  const topBlockers = Array.from({ length: 3 }).map((_, idx) => {
    const pick = (seed + 100 + idx * 7) % topBlockersPool.length;
    return topBlockersPool[pick];
  });

  return {
    id: "an_" + seed.toString(16),
    deckId: deck.id,
    persona,
    createdAt: Date.now(),
    overallScore,
    categoryScores,
    percentile,
    topBlockers,
    findings,
  };
}
