import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Home & Auto Insurance in Benbrook, TX",
  description:
    "Protect your home, car, boat, RV, motorcycle, and more with comprehensive personal lines insurance from SIG Clearfork Insurance Group in Benbrook, TX.",
  alternates: { canonical: "https://clearforkinsurance.com/home-auto-insurance" },
};

const COVERAGES = [
  { name: "Home Insurance", desc: "Protect your home and personal property from unexpected damage, theft, and liability." },
  { name: "Auto Insurance", desc: "Comprehensive auto coverage including collision, liability, and uninsured motorist protection." },
  { name: "Boat & RV Coverage", desc: "Specialized coverage for your recreational vehicles, boats, and watercraft." },
  { name: "Umbrella Protection", desc: "Extra liability coverage beyond your standard policies for added peace of mind." },
  { name: "Motorcycle Insurance", desc: "Full coverage for motorcycles including collision, comprehensive, and accessory protection." },
];

export default function HomeAutoPage() {
  const schemas = [
    serviceSchema(
      "Home & Auto Insurance",
      "Comprehensive personal lines insurance covering home, auto, boat, RV, umbrella, and motorcycle in Benbrook, TX.",
      "https://clearforkinsurance.com/home-auto-insurance",
    ),
    breadcrumbSchema([
      { name: "Home", url: "https://clearforkinsurance.com/" },
      { name: "Home & Auto Insurance", url: "https://clearforkinsurance.com/home-auto-insurance" },
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
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Home & Auto Insurance" }]} />
        <h1 className="mb-4 text-4xl font-bold text-[var(--navy)]">
          Personal Lines Insurance
        </h1>
        <p className="mb-10 text-lg text-[var(--slate)]">
          Comprehensive coverage for your personal assets and lifestyle. We
          work with top-rated carriers to find the right protection at the
          right price.
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
