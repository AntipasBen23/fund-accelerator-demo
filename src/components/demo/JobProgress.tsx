"use client";

import { Job } from "@/types/demo";

const stageLabel: Record<string, string> = {
  queued: "Queued",
  parsing: "Parsing",
  scoring: "Scoring",
  rewrites: "Rewrites",
  benchmarks: "Benchmarks",
  finalizing: "Finalizing",
  done: "Done",
  error: "Error",
};

export default function JobProgress({ job }: { job?: Job }) {
  if (!job) {
    return (
      <div className="rounded-xl border border-brand-line bg-white/70 p-4 text-sm text-brand-ink/70">
        No job running.
      </div>
    );
  }

  const label = stageLabel[job.stage] ?? job.stage;

  return (
    <div className="rounded-xl border border-brand-line bg-white/70 p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold">{label}</div>
          <div className="mt-1 text-sm text-brand-ink/70">{job.message}</div>
          {job.error && <div className="mt-2 text-sm font-semibold text-red-600">{job.error}</div>}
        </div>
        <div className="text-sm font-semibold text-brand-ink/70">{job.progress}%</div>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-line">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-blue transition-all"
          style={{ width: `${job.progress}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {["queued", "parsing", "scoring", "rewrites", "benchmarks", "finalizing", "done"].map((s) => (
          <span
            key={s}
            className={[
              "pill",
              job.stage === s ? "border-transparent bg-brand-ink text-white" : "",
            ].join(" ")}
          >
            {stageLabel[s]}
          </span>
        ))}
      </div>
    </div>
  );
}
