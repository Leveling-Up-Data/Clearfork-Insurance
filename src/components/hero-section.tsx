"use client";

import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

const BACKDROP = encodeURI("/images/backdrop photo_1761008288886.jpg");

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "h-[520px] sm:h-[600px] lg:h-[672px]",
      )}
    >
      <Image
        src={BACKDROP}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-[var(--navy-dark)]/75"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#8BC53F]/25 via-transparent to-[var(--navy)]/50"
        aria-hidden
      />
      <div className="relative z-10 flex h-full items-center">
        <PageShell>
          <div className="mx-auto max-w-3xl text-center text-white">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Insurance is complex, but we&apos;ve got you.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
              With 90 years of combined experience, we provide comprehensive
              insurance solutions for individuals and businesses. Trust SIG
              Clearfork Insurance Group to protect what matters most.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[var(--navy-dark)] shadow-md transition hover:bg-white/95"
              >
                Get A Quote Today
              </button>
              <button
                type="button"
                onClick={() => scrollToId("services")}
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[var(--navy-dark)] shadow-md transition hover:bg-white/95"
              >
                View Our Services
              </button>
            </div>
          </div>
        </PageShell>
      </div>
    </section>
  );
}
