import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cyber Insurance in Benbrook, TX",
  description:
    "Protect your business from data breaches, ransomware, and cyber threats with comprehensive cyber insurance from SIG Clearfork Insurance Group.",
  alternates: { canonical: "https://clearforkinsurance.com/cyber-insurance" },
};

export default function CyberInsurancePage() {
  const schemas = [
    serviceSchema(
      "Cyber Insurance",
      "Protection against data breaches, ransomware, and cyber threats for businesses in Benbrook, TX.",
      "https://clearforkinsurance.com/cyber-insurance",
    ),
    breadcrumbSchema([
      { name: "Home", url: "https://clearforkinsurance.com/" },
      { name: "Cyber Insurance", url: "https://clearforkinsurance.com/cyber-insurance" },
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
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cyber Insurance" }]} />
        <h1 className="mb-4 text-4xl font-bold text-[var(--navy)]">Cyber Insurance</h1>
        <p className="mb-10 text-lg text-[var(--slate)]">
          In today&apos;s digital world, cyber threats are a growing risk for
          businesses of all sizes. Our cyber insurance solutions protect your
          business from the financial impact of data breaches and cyber attacks.
        </p>
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--mist)] bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-[var(--navy)]">Data Breach Response</h3>
            <p className="text-sm text-[var(--slate)]">
              Coverage for notification costs, credit monitoring, forensic investigation, and public relations following a data breach.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--mist)] bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-[var(--navy)]">Ransomware Protection</h3>
            <p className="text-sm text-[var(--slate)]">
              Financial protection against ransomware attacks, including ransom payments and business interruption costs.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--mist)] bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-[var(--navy)]">Business Interruption</h3>
            <p className="text-sm text-[var(--slate)]">
              Coverage for lost income and extra expenses when a cyber event disrupts your business operations.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--mist)] bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-[var(--navy)]">Liability Coverage</h3>
            <p className="text-sm text-[var(--slate)]">
              Protection against third-party lawsuits arising from a data breach or failure to protect sensitive information.
            </p>
          </div>
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
