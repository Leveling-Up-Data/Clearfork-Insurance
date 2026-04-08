"use client";

import { PageShell } from "@/components/page-shell";

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function CtaSection() {
  return (
    <section className="bg-[#003169] py-16 text-white lg:py-20">
      <PageShell>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Experience the Clearfork Difference
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/90 lg:text-lg">
            Work with a local team that puts your coverage first — clear
            explanations, responsive support, and options from trusted carriers.
          </p>
          <button
            type="button"
            onClick={scrollToContact}
            className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#003169] shadow-md transition hover:bg-white/95"
          >
            Get a Free Quote
          </button>
        </div>
      </PageShell>
    </section>
  );
}
