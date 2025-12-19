"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/about", label: "About" },
  { href: "/program", label: "Program" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line bg-brand-bg/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-line bg-white shadow-soft">
            <span className="text-sm">✶</span>
          </span>
          <span className="text-lg">The Fundraising <span className="font-black">Accelerator</span></span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "text-sm font-medium text-brand-ink/80 hover:text-brand-ink",
                path === n.href && "text-brand-ink"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="hidden rounded-full border border-brand-line bg-white px-4 py-2 text-sm font-semibold shadow-soft hover:opacity-90 md:inline-flex"
          >
            View Demo
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-90"
          >
            Join the Tribe <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
