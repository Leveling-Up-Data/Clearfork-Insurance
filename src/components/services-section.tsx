"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import {
  BadgeDollarSign,
  Building,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  Monitor,
  Ship,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 3200;

const SERVICES = [
  {
    title: "Home & Auto",
    href: "/home-auto-insurance",
    icon: Home,
    coverages: [
      "Homeowners & renters",
      "Auto & umbrella",
      "Boat, RV & motorcycle",
      "Personal liability",
    ],
  },
  {
    title: "Commercial",
    href: "/commercial-insurance",
    icon: Building,
    coverages: [
      "General liability",
      "Commercial property",
      "Commercial auto",
      "Workers' compensation",
    ],
  },
  {
    title: "Marine & Watercraft",
    href: "/home-auto-insurance",
    icon: Ship,
    coverages: [
      "Boat & yacht coverage",
      "Watercraft liability",
      "Equipment & trailers",
      "Seasonal & year-round options",
    ],
  },
  {
    title: "Life Insurance",
    href: "/life-insurance",
    icon: Heart,
    coverages: [
      "Term & whole life",
      "Universal life",
      "Key person coverage",
      "Business & estate planning",
    ],
  },
  {
    title: "Cyber Insurance",
    href: "/cyber-insurance",
    icon: Monitor,
    coverages: [
      "Data breach response",
      "Business interruption",
      "Cyber extortion",
      "Third-party liability",
    ],
  },
  {
    title: "Performance & Bid Bonds",
    href: "/bonds",
    icon: BadgeDollarSign,
    coverages: [
      "Bid & performance bonds",
      "Payment & maintenance",
      "Contract surety",
      "Fast turnaround",
    ],
  },
] as const;

export default function ServicesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [paused, setPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi || paused) return;
    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [emblaApi, paused]);

  return (
    <section
      id="services"
      className="bg-primary py-16 text-primary-foreground lg:py-24"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <PageShell>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-center lg:gap-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Insurance Services
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/90">
              We offer a full range of personal and commercial products tailored
              to your goals — from home and auto to life, cyber, and surety bonds.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={scrollPrev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 transition hover:bg-white/20"
                aria-label="Previous services"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 transition hover:bg-white/20"
                aria-label="Next services"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y gap-4">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className={cn(
                      "min-w-0 flex-[0_0_85%] sm:flex-[0_0_55%] lg:flex-[0_0_42%]",
                    )}
                  >
                    <article
                      className={cn(
                        "flex h-full min-h-[380px] flex-col rounded-lg bg-white p-6 shadow-lg",
                        "text-foreground",
                      )}
                    >
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <h3 className="text-xl font-bold text-[var(--navy)]">
                        {s.title}
                      </h3>
                      <ul className="mt-4 flex-1 space-y-2 text-sm text-[var(--slate)]">
                        {s.coverages.map((c) => (
                          <li key={c} className="flex gap-2">
                            <span className="text-primary">✓</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={s.href}
                        className="mt-6 inline-flex w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                      >
                        Learn More
                      </Link>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PageShell>
    </section>
  );
}
