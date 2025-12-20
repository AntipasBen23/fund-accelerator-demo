"use client";

import { PERSONAS } from "@/lib/mock";
import { PersonaId } from "@/types/demo";

export default function PersonaPicker({
  persona,
  onChange,
}: {
  persona: PersonaId;
  onChange: (p: PersonaId) => void;
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-brand-ink/70">Investor Persona</div>
      <div className="mt-2 grid gap-2">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={[
              "w-full rounded-xl border px-4 py-3 text-left shadow-soft transition",
              p.id === persona
                ? "border-transparent bg-brand-ink text-white"
                : "border-brand-line bg-white hover:opacity-90",
            ].join(" ")}
          >
            <div className="text-sm font-semibold">{p.name}</div>
            <div className={`mt-1 text-xs ${p.id === persona ? "text-white/80" : "text-brand-ink/70"}`}>
              {p.summary}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
