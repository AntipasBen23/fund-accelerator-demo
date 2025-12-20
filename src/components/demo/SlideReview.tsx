"use client";

import { Analysis, Deck } from "@/types/demo";

export default function SlideReview({ deck, analysis }: { deck: Deck; analysis: Analysis }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-brand-ink/70">Per-slide review</div>
          <div className="mt-1 text-lg font-black">Fix the highest-leverage slides first</div>
        </div>
        <div className="pill">{deck.slideCount} slides</div>
      </div>

      <div className="mt-5 grid gap-4">
        {deck.slides.map((sl) => {
          const f = analysis.findings.find((x) => x.slideId === sl.id);
          if (!f) return null;

          return (
            <div key={sl.id} className="rounded-xl border border-brand-line bg-white/70 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold">{sl.title}</div>
                  <div className="mt-1 text-xs text-brand-ink/70">
                    Type: <span className="font-semibold text-brand-ink">{sl.type}</span>
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  Score: <span className="brand-gradient-text">{f.score}</span>
                </div>
              </div>

              <div className="mt-3 text-sm text-brand-ink/70">
                <span className="font-semibold text-brand-ink">Current:</span> {sl.text}
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-brand-line bg-white p-3">
                  <div className="text-xs font-semibold text-brand-ink/70">Strengths</div>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    {f.strengths.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>

                <div className="rounded-xl border border-brand-line bg-white p-3">
                  <div className="text-xs font-semibold text-brand-ink/70">Issues</div>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    {f.issues.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-brand-line bg-white p-3">
                <div className="text-xs font-semibold text-brand-ink/70">Rewrite suggestion</div>
                <div className="mt-2 text-sm font-semibold">{f.rewrites.headline}</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-brand-ink/70">
                  {f.rewrites.bullets?.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
