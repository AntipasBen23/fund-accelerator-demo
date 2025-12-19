import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-line bg-white/40">
      <div className="container-page py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">The Fundraising Accelerator</div>
            <div className="mt-1 text-sm text-brand-ink/70">
              Demo build: simulated analysis engine (no backend required).
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-brand-ink/80">
            <Link className="hover:text-brand-ink" href="/demo">Demo</Link>
            <Link className="hover:text-brand-ink" href="/about">About</Link>
            <Link className="hover:text-brand-ink" href="/program">Program</Link>
            <Link className="hover:text-brand-ink" href="/blog">Blog</Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-brand-ink/60">
          © {new Date().getFullYear()} Demo UI • Built with Next.js + Tailwind
        </div>
      </div>
    </footer>
  );
}
