import Link from "next/link";
import { QuoteForm } from "@/components/quote-form";

const SERVICES = [
  {
    title: "Personal Lines Insurance",
    desc: "Comprehensive coverage for your personal assets and lifestyle — home, auto, boat, RV, umbrella, and motorcycle insurance.",
    href: "/home-auto-insurance",
    items: ["Home Insurance", "Auto Insurance", "Boat & RV Coverage", "Umbrella Protection", "Motorcycle Insurance"],
  },
  {
    title: "Commercial Insurance",
    desc: "Full-range business coverage from general liability to workers' comp. We protect your property, equipment, and reputation.",
    href: "/commercial-insurance",
    items: ["General Liability", "Commercial Property", "Commercial Auto", "Workers' Compensation", "Business Owner's Policy"],
  },
  {
    title: "Life Insurance",
    desc: "Financial security and peace of mind for your loved ones with term, whole, universal, and corporate life plans.",
    href: "/life-insurance",
    items: ["Term Life", "Whole Life", "Universal Life", "Key Man Coverage", "Corporate Life Plans"],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-[var(--green-light)]/30 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[var(--navy)] lg:text-5xl">
              Insurance is complex,<br />but we&apos;ve got you.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-[var(--slate)]">
              With 90 years of combined experience, we provide comprehensive
              insurance solutions for individuals and businesses. Trust Clearfork
              Insurance Group to protect what matters most.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#quote"
                className="rounded-full bg-[var(--green-primary)] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--green-dark)]"
              >
                Get A Quote Today
              </Link>
              <Link
                href="#services"
                className="rounded-full border border-[var(--mist)] bg-white px-8 py-3 text-sm font-semibold text-[var(--navy)] transition-colors hover:border-[var(--green-primary)]"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[var(--navy)]">Insurance Services</h2>
            <p className="mx-auto max-w-2xl text-[var(--slate)]">
              We offer a variety of insurance products tailored to meet your personal and business needs.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-[var(--mist)] bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-3 text-xl font-bold text-[var(--navy)]">{s.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-[var(--slate)]">{s.desc}</p>
                <ul className="mb-6 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--gray-700)]">
                      <span className="text-[var(--green-primary)]">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  className="text-sm font-semibold text-[var(--green-primary)] transition-colors hover:text-[var(--green-dark)]"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/bonds"
              className="mr-4 text-sm font-semibold text-[var(--green-primary)] transition-colors hover:text-[var(--green-dark)]"
            >
              Performance & Bid Bonds →
            </Link>
            <Link
              href="/cyber-insurance"
              className="text-sm font-semibold text-[var(--green-primary)] transition-colors hover:text-[var(--green-dark)]"
            >
              Cyber Insurance →
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="bg-[var(--green-light)]/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-[var(--navy)]">
              SIG Clearfork Insurance Group
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--slate)]">
              At SIG Clearfork Insurance Group, we know that running a business
              comes with risks — from protecting your property and equipment to
              safeguarding your reputation. That&apos;s why we provide a full
              range of commercial and personal insurance solutions tailored to
              your unique needs.
            </p>
            <Link
              href="/our-story"
              className="rounded-full bg-[var(--green-primary)] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--green-dark)]"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-[var(--navy)]">
                Get Your Quote Today
              </h2>
              <p className="mb-8 text-lg text-[var(--slate)]">
                Ready to protect what matters most? Contact Clearfork Insurance
                Group for a personalized quote and expert guidance.
              </p>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-[var(--navy)]">Phone</h4>
                  <a href="tel:8172498683" className="text-[var(--green-primary)]">
                    (817) 249-8683
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--navy)]">Email</h4>
                  <a href="mailto:clearfork@sig4you.com" className="text-[var(--green-primary)]">
                    clearfork@sig4you.com
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--navy)]">Office</h4>
                  <p className="text-[var(--slate)]">
                    992 Winscott Rd Suite B<br />Benbrook, TX 76126
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--mist)] bg-white p-8 shadow-sm">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
