import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Life Insurance in Benbrook, TX",
  description:
    "Secure your family's future with term, whole, universal, key man, and corporate life insurance plans from SIG Clearfork Insurance Group.",
  alternates: { canonical: "https://clearforkinsurance.com/life-insurance" },
};

const COVERAGES = [
  { name: "Term Life Insurance", desc: "Affordable coverage for a specific period — ideal for mortgage protection and income replacement." },
  { name: "Whole Life Insurance", desc: "Permanent coverage with a cash value component that grows over time." },
  { name: "Universal Life Insurance", desc: "Flexible premiums and death benefits with a cash value that earns interest." },
  { name: "Key Man Coverage", desc: "Protect your business from the financial impact of losing a key employee or partner." },
  { name: "Corporate Life Plans", desc: "Group life insurance solutions designed for businesses of all sizes." },
];

export default function LifeInsurancePage() {
  const schemas = [
    serviceSchema(
      "Life Insurance",
      "Term, whole, universal, key man, and corporate life insurance plans in Benbrook, TX.",
      "https://clearforkinsurance.com/life-insurance",
    ),
    breadcrumbSchema([
      { name: "Home", url: "https://clearforkinsurance.com/" },
      { name: "Life Insurance", url: "https://clearforkinsurance.com/life-insurance" },
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
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Life Insurance" }]} />
        <h1 className="mb-4 text-4xl font-bold text-[var(--navy)]">Life Insurance</h1>
        <p className="mb-10 text-lg text-[var(--slate)]">
          Financial security and peace of mind for your loved ones. We help you
          find the right life insurance policy to protect what matters most.
        </p>
        <div className="space-y-6">
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
