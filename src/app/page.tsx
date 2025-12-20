import Link from "next/link";

export default function HomePage() {
  return (
    <section className="container-page">
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            YOUR NETWORK IS{" "}
            <span className="brand-gradient-text">NOT</span>
            <br />
            YOUR NET WORTH.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-ink/70 md:text-xl">
            The proven system for underestimated founders to bypass the old boys&apos; club,
            get investor-ready, and pitch directly to active investors.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-brand-ink px-7 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-90"
            >
              Join the Tribe <span className="ml-2" aria-hidden>→</span>
            </Link>

            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full border border-brand-line bg-white px-7 py-3 text-sm font-semibold shadow-soft hover:opacity-90"
            >
              View Demo
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-brand-pink/30 to-brand-blue/30 shadow-soft"
                />
              ))}
            </div>
            <div className="text-sm font-medium text-brand-ink/70">
              Trusted by founders who&apos;ve raised <span className="font-semibold text-brand-ink">£38M+</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            {
              title: "⚙️ The System",
              desc: "A playbook that turns a messy deck into investor-ready signal.",
            },
            {
              title: "🤝 The Access",
              desc: "A direct path into a curated network of VCs and Angels.",
            },
            {
              title: "🔥 The Tribe",
              desc: "A community of peers who understand the struggle.",
            },
          ].map((c) => (
            <div key={c.title} className="card p-6">
              <div className="text-base font-semibold">{c.title}</div>
              <p className="mt-2 text-sm text-brand-ink/70">{c.desc}</p>
              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand-pink to-brand-blue" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
