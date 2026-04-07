import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Commercial Insurance in Benbrook, TX",
  description:
    "Protect your business with comprehensive commercial insurance — general liability, property, auto, workers' comp, BOP, and more from SIG Clearfork Insurance Group.",
  alternates: { canonical: "https://clearforkinsurance.com/commercial-insurance" },
};

const COVERAGES = [
  { name: "General Liability Insurance", desc: "Protect your business against third-party claims of bodily injury, property damage, and personal injury." },
  { name: "Commercial Property Insurance", desc: "Coverage for your buildings, equipment, inventory, and other business property." },
  { name: "Commercial Auto Insurance", desc: "Protect vehicles used for business operations, including liability and physical damage." },
  { name: "Workers' Compensation", desc: "Required coverage that protects employees injured on the job and shields your business from lawsuits." },
  { name: "Business Owner's Policy (BOP)", desc: "Bundled coverage combining general liability and commercial property at a competitive rate." },
  { name: "Inland Marine Insurance", desc: "Coverage for equipment, tools, and materials in transit or stored at job sites." },
  { name: "Professional Liability", desc: "Errors & omissions coverage protecting against claims of negligence or inadequate work." },
  { name: "Industry-Specific Coverage", desc: "Tailored solutions for contractors, restaurants, retail, healthcare, and more." },
];

export default function CommercialPage() {
  const schemas = [
    serviceSchema(
      "Commercial Insurance",
      "Full-range commercial insurance including GL, property, auto, workers' comp, and BOP in Benbrook, TX.",
      "https://clearforkinsurance.com/commercial-insurance",
    ),
    breadcrumbSchema([
      { name: "Home", url: "https://clearforkinsurance.com/" },
      { name: "Commercial Insurance", url: "https://clearforkinsurance.com/commercial-insurance" },
    ]),
  ];

  return (
    <section className="py-16">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Commercial Insurance" }]} />
        <h1 className="mb-4 text-4xl font-bold text-[var(--navy)]">
          Commercial Insurance
        </h1>
        <p className="mb-10 text-lg text-[var(--slate)]">
          At SIG Clearfork Insurance Group, we know that running a business
          comes with risks — from protecting your property and equipment to
          safeguarding your reputation. We provide a full range of commercial
          insurance solutions.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {COVERAGES.map((c) => (
            <div key={c.name} className="rounded-xl border border-[var(--mist)] bg-white p-6">
              <h3 className="mb-2 text-lg font-semibold text-[var(--navy)]">{c.name}</h3>
              <p className="text-sm text-[var(--slate)]">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/#quote"
            className="rounded-full bg-[var(--green-primary)] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--green-dark)]"
          >
            Get Your Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
