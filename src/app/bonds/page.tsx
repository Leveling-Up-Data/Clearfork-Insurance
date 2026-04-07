import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Performance & Bid Bonds in Benbrook, TX",
  description:
    "Secure performance bonds, bid bonds, and surety bonds for contractors and businesses from SIG Clearfork Insurance Group in Benbrook, TX.",
  alternates: { canonical: "https://clearforkinsurance.com/bonds" },
};

export default function BondsPage() {
  const schemas = [
    serviceSchema(
      "Performance & Bid Bonds",
      "Performance bonds, bid bonds, and surety bonds for contractors and businesses in Benbrook, TX.",
      "https://clearforkinsurance.com/bonds",
    ),
    breadcrumbSchema([
      { name: "Home", url: "https://clearforkinsurance.com/" },
      { name: "Performance & Bid Bonds", url: "https://clearforkinsurance.com/bonds" },
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
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Performance & Bid Bonds" }]} />
        <h1 className="mb-4 text-4xl font-bold text-[var(--navy)]">
          Performance & Bid Bonds
        </h1>
        <p className="mb-10 text-lg text-[var(--slate)]">
          Whether you&apos;re bidding on a government contract or guaranteeing
          project completion, our bonding solutions help you win more work and
          build trust with clients.
        </p>
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--mist)] bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-[var(--navy)]">Bid Bonds</h3>
            <p className="text-sm text-[var(--slate)]">
              Guarantee that you will enter into a contract at the bid price if awarded the project. Required for most public construction projects.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--mist)] bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-[var(--navy)]">Performance Bonds</h3>
            <p className="text-sm text-[var(--slate)]">
              Assure the project owner that the work will be completed according to the contract terms and specifications.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--mist)] bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-[var(--navy)]">Payment Bonds</h3>
            <p className="text-sm text-[var(--slate)]">
              Guarantee that subcontractors and suppliers will be paid for their work and materials on the project.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--mist)] bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-[var(--navy)]">License & Permit Bonds</h3>
            <p className="text-sm text-[var(--slate)]">
              Required by government agencies to ensure compliance with regulations and licensing requirements.
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
