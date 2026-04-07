import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about SIG Clearfork Insurance Group — 90 years of combined experience serving Benbrook, TX and the greater DFW area.",
  alternates: { canonical: "https://clearforkinsurance.com/our-story" },
};

export default function OurStoryPage() {
  const crumbs = [
    { name: "Home", url: "https://clearforkinsurance.com/" },
    { name: "Our Story", url: "https://clearforkinsurance.com/our-story" },
  ];

  return (
    <section className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Story" }]} />
        <h1 className="mb-6 text-4xl font-bold text-[var(--navy)]">Our Story</h1>
        <div className="prose max-w-none">
          <p>
            At SIG Clearfork Insurance Group, we know that running a business
            comes with risks — from protecting your property and equipment to
            safeguarding your reputation. That&apos;s why we provide a full
            range of commercial and personal insurance solutions tailored to
            your unique needs.
          </p>
          <p>
            With 90 years of combined experience, our team has built lasting
            relationships with the families and businesses of Benbrook and the
            greater DFW area. We believe insurance should be straightforward,
            personal, and reliable.
          </p>
          <h2>Experience the Clearfork Difference</h2>
          <p>
            Join the families and businesses who have trusted us for decades
            with their insurance needs. We combine deep industry knowledge with
            a personal touch that large agencies simply can&apos;t match.
          </p>
          <ul>
            <li>90 years of combined experience in insurance</li>
            <li>Locally owned and operated in Benbrook, TX</li>
            <li>Personalized service from dedicated agents</li>
            <li>Comprehensive coverage across personal and commercial lines</li>
            <li>Strong relationships with top-rated carriers</li>
          </ul>
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
