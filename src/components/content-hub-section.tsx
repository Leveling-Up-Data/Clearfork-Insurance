"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

const img = (path: string) => encodeURI(path);

const BLOG_ITEMS = [
  {
    title: "How We Protect Your Blended Family",
    excerpt:
      "Blended families face unique coverage gaps. Here is how we align policies so everyone is protected.",
    author: "David Hargrove",
    role: "Owner",
    date: "Jan 6, 2026",
    href: "/blogs/how-we-protect-your-blended-family",
    image: img("/images/group photo 3_1761008420820.jpg"),
    avatar: img("/images/david hargrove head shot_1761004385331.jpg"),
  },
  {
    title: "How End-of-Life Planning Can Ease Financial Concerns",
    excerpt:
      "Planning ahead can lift the burden on loved ones. We walk through life insurance and legacy considerations.",
    author: "Sid Hargrove",
    role: "Owner",
    date: "Jan 6, 2026",
    href: "/blogs/how-end-of-life-planning-can-ease-financial-concerns",
    image: img("/images/SCR-20250919-sqme_1758335513957.jpeg"),
    avatar: img("/images/sid hargrove headshot_1761004385331.jpg"),
  },
  {
    title: "Life Insurance: 5 Signs You Might Be Underinsured",
    excerpt:
      "Coverage amounts often lag behind real life. These five signals mean it is time for a review.",
    author: "Alecia Middleton",
    role: "Licensed Agent",
    date: "Jan 6, 2026",
    href: "/blogs/life-insurance-5-signs-you-might-be-underinsured",
    image: img("/images/SCR-20250919-sqme_1758335513957-DJk4-g.jpeg"),
    avatar: img("/images/alecia middleton headshot_1761004385330.jpg"),
  },
] as const;

const VIDEO_ITEMS = [
  {
    title: "Homeowners Insurance",
    excerpt:
      "What goes into a strong homeowners policy — and what to ask your agent before renewal.",
    videoId: "a18d456Y0RQ",
    image: img("/images/group photo 1 (1)_1761008519000.jpg"),
    author: "Clearfork Team",
    avatar: img("/images/leslie dolman headshot_1761004385329.jpg"),
  },
  {
    title: "Accidents and Disability",
    excerpt:
      "When the unexpected happens, the right coverage can protect income and recovery time.",
    videoId: "KGDHxRv36mE",
    image: img("/images/group photo 3_1761008420820.jpg"),
    author: "Clearfork Team",
    avatar: img("/images/kelli bhaner head shot_1761004385330.jpg"),
  },
] as const;

/** Replace embed URLs with your production Spotify episode or show URLs when available. */
const PODCAST_ITEMS = [
  {
    title: "RV Insurance: Protecting Your Adventures",
    excerpt:
      "Hit the road with confidence — we cover liability, personal effects, and full-timer scenarios.",
    image: img("/images/group photo 1 (1)_1761008519000.jpg"),
    author: "Clearfork Team",
    avatar: img("/images/david hargrove head shot_1761004385331.jpg"),
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/show/3yVcLzTuxVS2bXbc5dNDsG?utm_source=generator",
  },
  {
    title: "Cyber Insurance: What You Need to Know",
    excerpt:
      "From phishing to ransomware, learn what cyber policies typically cover — and where gaps appear.",
    image: img("/images/SCR-20250919-sqme_1758335513957.jpeg"),
    author: "Clearfork Team",
    avatar: img("/images/sid hargrove headshot_1761004385331.jpg"),
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/show/2VRS1IJCTn2Nlkg33S1KG2?utm_source=generator",
  },
] as const;

type ModalState =
  | { kind: "video"; videoId: string; title: string }
  | { kind: "podcast"; embedUrl: string; title: string }
  | null;

export default function ContentHubSection() {
  const [modal, setModal] = useState<ModalState>(null);

  const closeModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    if (!modal) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, closeModal]);

  return (
    <section className="border-t border-[var(--mist)] bg-secondary/40 py-16 lg:py-24">
      <PageShell>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {/* Blog */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)]">Blog</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--slate)]">
              Practical guidance on life, home, and business coverage from our
              licensed team.
            </p>
            <ul className="mt-8 space-y-8">
              {BLOG_ITEMS.map((post) => (
                <li key={post.href}>
                  <Link href={post.href} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20"
                        aria-hidden
                      />
                      <span
                        className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[var(--navy)] shadow-md transition group-hover:bg-white"
                        aria-hidden
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[var(--navy)] transition group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--slate)]">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                        <Image
                          src={post.avatar}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      </div>
                      <div className="text-xs">
                        <p className="font-semibold text-[var(--navy)]">
                          {post.author}
                        </p>
                        <p className="text-[var(--slate)]">
                          {post.role} · {post.date}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blogs"
              className="mt-8 inline-flex rounded-full border border-primary bg-white px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
            >
              Explore
            </Link>
          </div>

          {/* Video */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)]">Video</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--slate)]">
              Short explainers on products and real questions we hear from
              clients.
            </p>
            <ul className="mt-8 space-y-8">
              {VIDEO_ITEMS.map((v) => (
                <li key={v.videoId}>
                  <button
                    type="button"
                    onClick={() =>
                      setModal({
                        kind: "video",
                        videoId: v.videoId,
                        title: v.title,
                      })
                    }
                    className="w-full text-left"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                      <Image
                        src={v.image}
                        alt=""
                        fill
                        className="object-cover transition duration-300 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20"
                        aria-hidden
                      />
                      <span
                        className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[var(--navy)] shadow-md"
                        aria-hidden
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[var(--navy)]">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--slate)]">
                      {v.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                        <Image
                          src={v.avatar}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      </div>
                      <p className="text-xs font-semibold text-[var(--navy)]">
                        {v.author}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full border border-primary bg-white px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
            >
              Explore
            </a>
          </div>

          {/* Podcast */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)]">Podcast</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--slate)]">
              Deeper dives on specialty lines and risk trends — listen on
              Spotify.
            </p>
            <ul className="mt-8 space-y-8">
              {PODCAST_ITEMS.map((p) => (
                <li key={p.title}>
                  <button
                    type="button"
                    onClick={() =>
                      setModal({
                        kind: "podcast",
                        embedUrl: p.spotifyEmbedUrl,
                        title: p.title,
                      })
                    }
                    className="w-full text-left"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        className="object-cover transition duration-300 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20"
                        aria-hidden
                      />
                      <span
                        className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[var(--navy)] shadow-md"
                        aria-hidden
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[var(--navy)]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--slate)]">
                      {p.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                        <Image
                          src={p.avatar}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      </div>
                      <p className="text-xs font-semibold text-[var(--navy)]">
                        {p.author}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full border border-primary bg-white px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
            >
              Explore
            </a>
          </div>
        </div>
      </PageShell>

      {modal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={modal.title}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close dialog"
            onClick={closeModal}
          />
          <div
            className={cn(
              "relative z-10 w-full max-w-3xl overflow-hidden rounded-xl bg-black shadow-2xl",
              modal.kind === "podcast" ? "max-w-md" : "",
            )}
          >
            <div className="flex items-center justify-between gap-4 bg-[var(--navy-dark)] px-4 py-3 text-left text-sm font-semibold text-white">
              <span className="truncate">{modal.title}</span>
              <button
                type="button"
                onClick={closeModal}
                className="shrink-0 rounded-md px-2 py-1 text-white/90 hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div
              className={cn(
                "relative w-full bg-black",
                modal.kind === "video" ? "aspect-video" : "h-[min(90dvh,420px)] sm:h-[380px]",
              )}
            >
              {modal.kind === "video" ? (
                <iframe
                  title={modal.title}
                  src={`https://www.youtube.com/embed/${modal.videoId}?autoplay=1`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <iframe
                  title={modal.title}
                  src={modal.embedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
