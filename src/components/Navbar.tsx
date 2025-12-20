"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/about", label: "About" },
  { href: "/program", label: "Program" },
  { href: "/blog", label: "Blog" },
  { href: "/platform/readiness", label: "Readiness" },
];

export default function Navbar() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E1EE] bg-[#F8F3F9]/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-[#17242D]">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E1EE] bg-white shadow-[0_10px_30px_rgba(23,36,45,0.10)]">
            <span className="text-sm">✶</span>
          </span>
          <span className="text-lg">
            The Fundraising <span className="font-black">Accelerator</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={[
                "text-sm font-medium transition",
                path === n.href ? "text-[#17242D]" : "text-[#17242D]/70 hover:text-[#17242D]",
              ].join(" ")}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/platform/readiness"
            className="hidden rounded-full border border-[#E8E1EE] bg-white px-4 py-2 text-sm font-semibold shadow-[0_10px_30px_rgba(23,36,45,0.10)] hover:opacity-90 md:inline-flex"
          >
            View Demo
          </Link>

          <Link
            href="/platform/readiness"
            className="inline-flex items-center gap-2 rounded-full bg-[#17242D] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(23,36,45,0.10)] hover:opacity-90"
          >
            Join the Tribe <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
