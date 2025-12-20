"use client";

import { useMemo, useState } from "react";
import { Analysis, Deck } from "@/types/demo";

type Msg = { role: "ai" | "user"; text: string };

export default function PitchPractice({ deck, analysis }: { deck: Deck; analysis: Analysis }) {
  const starterQuestions = useMemo(() => {
    // pick a few tough questions from the lowest-scoring slides
    const sorted = [...analysis.findings].sort((a, b) => a.score - b.score);
    const picks = sorted.slice(0, 3).flatMap((f) => f.investorQuestions.slice(0, 1));
    return picks.length ? picks : ["Walk me through your wedge and why you win first."];
  }, [analysis]);

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text:
        "Pitch Practice (simulated). I’ll ask like a skeptical investor. Answer briefly and clearly.",
    },
    { role: "ai", text: starterQuestions[0] },
  ]);
  const [input, setInput] = useState("");

  function followupFromAnswer(answer: string) {
    const a = answer.toLowerCase();
    if (a.includes("mrr") || a.includes("revenue")) return "What’s driving growth—channel, conversion, or retention?";
    if (a.includes("pilot") || a.includes("beta")) return "What converts a pilot into paid—and how long does that take?";
    if (a.includes("market") || a.includes("tam")) return "Give me bottom-up math: how many buyers can you reach this year?";
    if (a.includes("team") || a.includes("founder")) return "What’s the strongest proof of founder-market fit?";
    return "What’s the one metric you’d bet your next round on, and why?";
  }

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMsgs((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");

    const next = followupFromAnswer(trimmed);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: next }]);
    }, 450);
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-brand-ink/70">Pitch practice</div>
          <div className="mt-1 text-lg font-black">Rehearse investor Q&A</div>
        </div>
        <div className="pill">{deck.name}</div>
      </div>

      <div className="mt-4 h-[420px] overflow-auto rounded-xl border border-brand-line bg-white/70 p-4">
        <div className="grid gap-3">
          {msgs.map((m, idx) => (
            <div
              key={idx}
              className={[
                "max-w-[90%] rounded-xl px-4 py-3 text-sm",
                m.role === "ai"
                  ? "border border-brand-line bg-white"
                  : "ml-auto bg-brand-ink text-white",
              ].join(" ")}
            >
              <div className="text-xs font-semibold opacity-70">
                {m.role === "ai" ? "Investor" : "You"}
              </div>
              <div className="mt-1">{m.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your answer…"
          className="w-full rounded-full border border-brand-line bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-pink/30"
        />
        <button
          onClick={send}
          className="rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-90"
        >
          Send
        </button>
      </div>

      <div className="mt-3 text-xs text-brand-ink/60">
        Demo note: this is a scripted follow-up engine, not live AI.
      </div>
    </div>
  );
}
