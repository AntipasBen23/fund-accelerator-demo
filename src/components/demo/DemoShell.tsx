"use client";

import { useEffect, useMemo, useState } from "react";
import type { Analysis, Deck, Job, PersonaId } from "@/types/demo";
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
    if (!state.deck) {
      setState((s) => ({ ...s, deck: SAMPLE_DECKS[0] }));
    }
  }, [state.deck]);

  const isRunning =
    !!state.job && state.job.stage !== "done" && state.job.stage !== "error";

  async function runSimulatedPipeline(deck: Deck, persona: PersonaId) {
    const job = newJob(deck.id, persona);
    setState((s) => ({ ...s, job, analysis: undefined }));

    const stages: Array<{
      stage: Job["stage"];
      progress: number;
      msg: string;
      delay: number;
    }> = [
      { stage: "queued", progress: 5, msg: "Queued…", delay: 500 },
      { stage: "parsing", progress: 18, msg: "Parsing deck content…", delay: 900 },
      { stage: "scoring", progress: 45, msg: "Scoring slides…", delay: 1100 },
      { stage: "rewrites", progress: 68, msg: "Generating rewrites…", delay: 1200 },
      { stage: "benchmarks", progress: 82, msg: "Running benchmarks…", delay: 900 },
      { stage: "finalizing", progress: 95, msg: "Finalizing report…", delay: 700 },
    ];

    for (const step of stages) {
      setState((s) => ({
        ...s,
        job: s.job
          ? {
              ...s.job,
              stage: step.stage,
              progress: step.progress,
              message: step.msg,
            }
          : s.job,
      }));
      await sleep(step.delay);
    }

    const analysis = generateAnalysis(deck, persona);

    setState((s) => ({
      ...s,
      analysis,
      job: s.job
        ? {
            ...s.job,
            stage: "done",
            progress: 100,
            message: "Done",
            analysisId: analysis.id,
          }
        : s.job,
    }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      {/* LEFT */}
      <aside className="card p-5">
        <div className="text-sm font-semibold text-brand-ink/70">
          PitchDeckAI (Demo)
        </div>
        <div className="mt-1 text-xl font-black tracking-tight">
          Investor-ready feedback in minutes
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
        </div>
      </aside>

      {/* RIGHT */}
      <section className="grid gap-6">
        <div className="card p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-brand-ink/70">
                Demo pipeline
              </div>
              <div className="mt-1 text-lg font-bold">
                {state.deck?.name}
              </div>
            </div>

            <div className="rounded-full border border-brand-line bg-white px-4 py-2 text-sm">
              Backend: <strong>simulated</strong> • AI: <strong>mock JSON</strong>
            </div>
          </div>

          {/* 🔥 HIGH-CONTRAST CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() =>
                state.deck && runSimulatedPipeline(state.deck, state.persona)
              }
              disabled={!state.deck || isRunning}
              className="
                inline-flex items-center justify-center
                rounded-full
                bg-white
                px-7 py-3
                text-sm font-bold
                text-black
                shadow-lg
                ring-2 ring-black/10
                hover:bg-neutral-100
                hover:shadow-xl
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >
              {isRunning ? "Analyzing…" : "Analyze Deck"}
              <span className="ml-2">→</span>
            </button>

            <div className="text-sm text-brand-ink/70">
              Persona:{" "}
              <span className="font-semibold text-brand-ink">
                {personaMeta?.name}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <JobProgress job={state.job} />
          </div>
        </div>

        {state.analysis && (
          <>
            <Scorecard analysis={state.analysis} />
            <div className="grid gap-6 lg:grid-cols-2">
              <SlideReview deck={state.deck!} analysis={state.analysis} />
              <PitchPractice deck={state.deck!} analysis={state.analysis} />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
