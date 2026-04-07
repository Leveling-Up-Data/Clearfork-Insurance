"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Home/Auto", href: "/home-auto-insurance" },
  { label: "Commercial", href: "/commercial-insurance" },
  { label: "Life", href: "/life-insurance" },
  { label: "Bonds", href: "/bonds" },
  { label: "Cyber", href: "/cyber-insurance" },
  { label: "Our Story", href: "/our-story" },
  { label: "Blog", href: "/blogs" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--mist)] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="SIG Clearfork Insurance Group" width={48} height={48} />
          <span className="hidden text-sm font-bold leading-tight text-[var(--navy)] sm:block">
            SIG Clearfork<br />Insurance Group
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--navy)] transition-colors hover:text-[var(--green-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:8172498683"
            className="text-sm font-medium text-[var(--navy)] transition-colors hover:text-[var(--green-primary)]"
          >
            (817) 249-8683
          </a>
          <Link
            href="/#quote"
            className="rounded-full bg-[var(--green-primary)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--green-dark)]"
          >
            Get A Quote
          </Link>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--navy)] lg:hidden"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d={open ? "M5 5l10 10M15 5L5 15" : "M3 5h14M3 10h14M3 15h14"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--mist)] bg-white px-6 pb-4 lg:hidden">
          <nav className="flex flex-col gap-3 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[var(--navy)] transition-colors hover:text-[var(--green-primary)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#quote"
            className="mt-2 block rounded-full bg-[var(--green-primary)] px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--green-dark)]"
            onClick={() => setOpen(false)}
          >
            Get A Quote
          </Link>
        </div>
      )}
    </header>
  );
}
