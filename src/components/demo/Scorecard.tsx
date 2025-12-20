"use client";

import { Analysis } from "@/types/demo";

function ScorePill({ label, score }: { label: string; score: number }) {
  return (
    <div className="rounded-xl border border-brand-line bg-white/70 p-4">
      <div className="text-sm font-semibold text-brand-ink/70">{label}</div>
      <div className="mt-1 text-2xl font-black">{score}</div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-line">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-blue"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function Scorecard({ analysis }: { analysis: Analysis }) {
  const c = analysis.categoryScores;

  return (
    <div className="card p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold text-brand-ink/70">Scorecard</div>
          <div className="mt-1 text-2xl font-black tracking-tight">
            Overall: <span className="brand-gradient-text">{analysis.overallScore}</span>
          </div>
          <div className="mt-1 text-sm text-brand-ink/70">
            Benchmark: better than <span className="font-semibold text-brand-ink">{analysis.percentile}%</span> of pre-seed decks (simulated).
          </div>
        </div>

        <div className="rounded-xl border border-brand-line bg-white/70 p-4">
          <div className="text-sm font-semibold">Top blockers</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-brand-ink/70">
            {analysis.topBlockers.slice(0, 3).map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <ScorePill label="Clarity" score={c.clarity} />
        <ScorePill label="Traction" score={c.traction} />
        <ScorePill label="Market" score={c.market} />
        <ScorePill label="Team" score={c.team} />
        <ScorePill label="Moat" score={c.moat} />
      </div>
    </div>
  );
}
