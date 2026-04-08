"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Headphones } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";

const img = (path: string) => encodeURI(path);

type PodcastItem = {
  id: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorSubtitle: string;
  image: string;
  avatar: string;
  href: string;
};

const PODCAST_ITEMS: PodcastItem[] = [
  {
    id: "1",
    title: "RV Insurance: Protecting Your Adventures",
    excerpt:
      "Choosing coverage limits, full-timer options, and what to watch for with towing, storage, and roadside help.",
    authorName: "David Hargrove, Owner",
    authorSubtitle: "Posted on Jan 6, 2026",
    image: img("/images/group photo 1 (1)_1761008519000.jpg"),
    avatar: img("/images/david hargrove head shot_1761004385331.jpg"),
    href: "/home-auto-insurance",
  },
  {
    id: "2",
    title: "Cyber Insurance: What You Need to Know",
    excerpt:
      "How cyber coverage helps businesses respond to incidents—breach response, ransomware, and business interruption.",
    authorName: "Sid Hargrove, Owner",
    authorSubtitle: "Posted on Jan 6, 2026",
    image: img("/images/SCR-20250919-sqme_1758335513957.jpeg"),
    avatar: img("/images/sid hargrove headshot_1761004385331.jpg"),
    href: "/cyber-insurance",
  },
  {
    id: "3",
    title: "Life Insurance and Family Planning",
    excerpt:
      "Practical conversations on term vs whole life and aligning coverage with your family's needs.",
    authorName: "David Hargrove, Owner",
    authorSubtitle: "Posted on Jan 6, 2026",
    image: img("/images/group photo 1 (1)_1761008519000.jpg"),
    avatar: img("/images/david hargrove head shot_1761004385331.jpg"),
    href: "/life-insurance",
  },
  {
    id: "4",
    title: "Performance and Bid Bonds in Construction",
    excerpt:
      "When bonds are required, how they protect project owners, and what agents need to know.",
    authorName: "Sid Hargrove, Owner",
    authorSubtitle: "Posted on Jan 6, 2026",
    image: img("/images/SCR-20250919-sqme_1758335513957.jpeg"),
    avatar: img("/images/sid hargrove headshot_1761004385331.jpg"),
    href: "/bonds",
  },
];

const POSTS_PER_PAGE = 9;

function PodcastCard({ item }: { item: PodcastItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-[220px] overflow-hidden">
        <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
        <p className="mt-2 line-clamp-2 text-[15px] leading-[22px] text-muted-foreground">
          {item.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
            <Image src={item.avatar} alt="" fill className="object-cover" sizes="40px" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{item.authorName}</div>
            <div className="text-xs text-muted-foreground">{item.authorSubtitle}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Link
            href={item.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Listen to Podcast
          </Link>
          <Link
            href={item.href}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            aria-label={`Listen to ${item.title}`}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function PodcastPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return PODCAST_ITEMS.slice(start, start + POSTS_PER_PAGE);
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(PODCAST_ITEMS.length / POSTS_PER_PAGE));

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Headphones className="h-7 w-7 text-primary" />
            </div>
            <div>
              <span className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Podcast
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Conversations on Risk &amp; Protection
              </h1>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Conversations on risk, protection, and peace of mind from our team.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <PageShell>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {paginatedItems.map((item) => (
              <PodcastCard key={item.id} item={item} />
            ))}
          </div>

          {totalPages > 1 ? (
            <nav
              className="mt-12 flex items-center justify-center gap-2"
              aria-label="Podcast pagination"
            >
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
              >
                ‹ Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCurrentPage(n)}
                  className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
                    currentPage === n
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
              >
                Next ›
              </button>
            </nav>
          ) : null}
        </PageShell>
      </section>
    </>
  );
}
