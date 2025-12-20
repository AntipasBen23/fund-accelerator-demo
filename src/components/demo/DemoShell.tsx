"use client";

import { useEffect, useMemo, useState } from "react";
import { Analysis, Deck, Job, PersonaId } from "@/types/demo";
import { PERSONAS, SAMPLE_DECKS, generateAnalysis } from "@/lib/mock";
import PersonaPicker from "./PersonaPicker";
import DeckPicker from "./DeckPicker";
import JobProgress from "./JobProgress";
import Scorecard from "./Scorecard";
import SlideReview from "./SlideReview";
import PitchPractice from "./PitchPractice";

type DemoState = {
  deck?: Deck;
  persona: PersonaId;
  job?: Job;
  analysis?: Analysis;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function newJob(deckId: string, persona: PersonaId): Job {
  return {
    id: "job_" + Math.random().toString(16).slice(2),
    deckId,
    persona,
    stage: "queued",
    progress: 0,
    message: "Queued…",
  };
}

export default function DemoShell() {
  const [state, setState] = useState<DemoState>({
    deck: undefined,
    persona: "preseed_vc",
  });

  const personaMeta = useMemo(
    () => PERSONAS.find((p) => p.id === state.persona),
    [state.persona]
  );

  useEffect(() => {
    // auto-load a sample deck for a better first impression
    if (!state.deck) {
      setState((s) => ({ ...s, deck: SAMPLE_DECKS[0] }));
    }
  }, [state.deck]);

  async function runSimulatedPipeline(deck: Deck, persona: PersonaId) {
    const job = newJob(deck.id, persona);
    setState((s) => ({ ...s, job, analysis: undefined }));

    const stages: Array<{ stage: Job["stage"]; progress: number; msg: string; delay: number }> = [
      { stage: "queued", progress: 5, msg: "Queued…", delay: 500 },
      { stage: "parsing", progress: 18, msg: "Parsing deck content…", delay: 900 },
      { stage: "scoring", progress: 45, msg: "Scoring slides (investor heuristics)…", delay: 1100 },
      { stage: "rewrites", progress: 68, msg: "Generating rewrites + pitch improvements…", delay: 1200 },
      { stage: "benchmarks", progress: 82, msg: "Comparing against winning-deck benchmarks…", delay: 900 },
      { stage: "finalizing", progress: 95, msg: "Finalizing report…", delay: 700 },
    ];

    // Optional “realistic flakiness”
    const failRoll = Math.random();
    const willSoftFail = failRoll < 0.06;

    for (let i = 0; i < stages.length; i++) {
      const step = stages[i];
      setState((s) => ({
        ...s,
        job: s.job ? { ...s.job, stage: step.stage, progress: step.progress, message: step.msg } : s.job,
      }));

      await sleep(step.delay);

      if (willSoftFail && step.stage === "parsing") {
        // simulate a recoverable warning
        setState((s) => ({
          ...s,
          job: s.job
            ? { ...s.job, message: "Slide 7 was image-heavy — used fallback text extraction." }
            : s.job,
        }));
        await sleep(600);
      }
    }

    const analysis = generateAnalysis(deck, persona);

    setState((s) => ({
      ...s,
      analysis,
      job: s.job
        ? { ...s.job, stage: "done", progress: 100, message: "Done.", analysisId: analysis.id }
        : s.job,
    }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="card p-5">
        <div className="text-sm font-semibold text-brand-ink/70">PitchDeckAI (Demo)</div>
        <div className="mt-1 text-xl font-black tracking-tight">
          Investor-ready feedback in minutes (simulated)
        </div>

        <div className="mt-5 grid gap-4">
          <PersonaPicker
            persona={state.persona}
            onChange={(p) => setState((s) => ({ ...s, persona: p }))}
          />

          <DeckPicker
            deck={state.deck}
            onPick={(d) => setState((s) => ({ ...s, deck: d }))}
          />

          <button
            className="mt-1 inline-flex items-center justify-center rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-90 disabled:opacity-50"
            disabled={!state.deck}
            onClick={() => state.deck && runSimulatedPipeline(state.deck, state.persona)}
          >
            Analyze Deck <span className="ml-2" aria-hidden>→</span>
          </button>

          {personaMeta && (
            <div className="rounded-xl border border-brand-line bg-white/70 p-4">
              <div className="text-sm font-semibold">{personaMeta.name}</div>
              <div className="mt-1 text-sm text-brand-ink/70">{personaMeta.summary}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {personaMeta.emphasis.map((e) => (
                  <span key={e} className="pill">{e}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      <section className="grid gap-6">
        <div className="card p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-brand-ink/70">Demo pipeline</div>
              <div className="mt-1 text-lg font-bold">
                {state.deck ? state.deck.name : "Pick a sample deck to begin"}
              </div>
            </div>

            <div className="rounded-full border border-brand-line bg-white px-4 py-2 text-sm text-brand-ink/70">
              Backend: <span className="font-semibold text-brand-ink">simulated</span> • AI:{" "}
              <span className="font-semibold text-brand-ink">mock JSON</span>
            </div>
          </div>

          <div className="mt-5">
            <JobProgress job={state.job} />
          </div>
        </div>

        {state.analysis ? (
          <>
            <Scorecard analysis={state.analysis} />

            <div className="grid gap-6 lg:grid-cols-2">
              <SlideReview deck={state.deck!} analysis={state.analysis} />
              <PitchPractice deck={state.deck!} analysis={state.analysis} />
            </div>
          </>
        ) : (
          <div className="card p-10 text-center">
            <div className="mx-auto max-w-xl">
              <div className="text-2xl font-black tracking-tight">
                Upload → Analyze → Fix → Practice
              </div>
              <p className="mt-3 text-brand-ink/70">
                This demo fakes the full system: async jobs, scoring, rewrites, benchmarks, and Q&A rehearsal.
                Click <span className="font-semibold text-brand-ink">Analyze Deck</span> to run the simulated pipeline.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  ["Scorecard", "Overall score + category breakdown"],
                  ["Per-slide fixes", "Strengths, issues, rewrites"],
                  ["Pitch practice", "Investor questions + follow-ups"],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-xl border border-brand-line bg-white/70 p-4">
                    <div className="font-semibold">{t}</div>
                    <div className="mt-1 text-sm text-brand-ink/70">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
