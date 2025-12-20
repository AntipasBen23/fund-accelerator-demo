"use client";

import { SAMPLE_DECKS } from "@/lib/mock";
import { Deck } from "@/types/demo";

export default function DeckPicker({
  deck,
  onPick,
}: {
  deck?: Deck;
  onPick: (d: Deck) => void;
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-brand-ink/70">Deck</div>

      <div className="mt-2 grid gap-2">
        {SAMPLE_DECKS.map((d) => (
          <button
            key={d.id}
            onClick={() => onPick(d)}
            className={[
              "w-full rounded-xl border px-4 py-3 text-left shadow-soft transition",
              d.id === deck?.id
                ? "border-brand-ink bg-white"
                : "border-brand-line bg-white hover:opacity-90",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">{d.name}</div>
              <span className="pill">{d.slideCount} slides</span>
            </div>
            <div className="mt-1 text-xs text-brand-ink/70">
              Sample deck used for demo realism (no PDF parsing required).
            </div>
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-brand-line bg-white/70 p-3 text-xs text-brand-ink/70">
        For your cold-email demo, this is perfect: it runs instantly and never breaks.
      </div>
    </div>
  );
}
