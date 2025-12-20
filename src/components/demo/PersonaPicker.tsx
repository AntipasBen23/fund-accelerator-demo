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
      <div className="text-sm font-semibold mb-2">Investor Persona</div>

      <div className="grid gap-3">
        {PERSONAS.map((p) => {
          const selected = persona === p.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange(p.id)}
              className="w-full text-left rounded-2xl border bg-white/70 p-4 transition"
              style={{
                borderColor: selected ? "#A52DAD" : "#E8E1EE",
                boxShadow: selected
                  ? "0 0 0 3px rgba(165,45,173,0.15), 0 10px 30px rgba(23,36,45,0.10)"
                  : "0 10px 30px rgba(23,36,45,0.06)",
              }}
              aria-pressed={selected}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="mt-1 text-sm" style={{ color: "rgba(23,36,45,0.75)" }}>
                    {p.summary}
                  </div>
                </div>

                {selected && (
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ background: "rgba(165,45,173,0.12)", color: "#A52DAD" }}
                    aria-hidden
                  >
                    ✓
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.emphasis.map((e) => (
                  <span
                    key={e}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-xs"
                    style={{
                      borderColor: "#E8E1EE",
                      background: "rgba(255,255,255,0.75)",
                      color: "#17242D",
                    }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
