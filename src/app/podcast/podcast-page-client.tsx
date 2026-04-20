"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight, Headphones, Podcast } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import type { InsurancePodcastShowcase } from "@/data/insurance-podcasts";
import { TEXAS_INSURANCE_PODCAST_FEATURED } from "@/data/texas-insurance-podcast-featured";
import type { PodcastEpisode } from "@/types/podcast-feed";

const imgFallbackCover = encodeURI(
  "/images/group photo 1 (1)_1761008519000.jpg",
);
const imgFallbackAvatar = encodeURI(
  "/images/david hargrove head shot_1761004385331.jpg",
);

function EpisodeCover({ src, alt }: { src: string; alt: string }) {
  const local = src.startsWith("/");
  if (local) {
    return (
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
    );
  }
  return (
    <div className="relative h-[220px] overflow-hidden bg-muted">
      {/* eslint-disable-next-line @next/next/no-img-element -- RSS artwork from podcast host */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function RssEpisodeCard({
  item,
  channelTitle,
}: {
  item: PodcastEpisode;
  channelTitle?: string;
}) {
  const cover = item.imageUrl ?? imgFallbackCover;
  const subtitle = item.publishedAt ?? "Episode";
  const showLabel = item.showTitle ?? channelTitle ?? "Podcast";

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <EpisodeCover src={cover} alt="" />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
        <p className="mt-2 line-clamp-3 text-[15px] leading-[22px] text-muted-foreground">
          {item.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
            <Image
              src={imgFallbackAvatar}
              alt=""
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              {showLabel}
            </div>
            <div className="text-xs text-muted-foreground">{subtitle}</div>
          </div>
        </div>
        <audio
          controls
          preload="none"
          src={item.audioUrl}
          className="mt-4 h-10 w-full"
        />
      </div>
    </article>
  );
}

function TexasFeaturedPodcastCard() {
  const d = TEXAS_INSURANCE_PODCAST_FEATURED;
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="block w-full text-left transition-colors hover:bg-muted/30"
        >
          <div className="relative h-[220px] overflow-hidden">
            <Image
              src={d.image}
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
          <div className="p-6">
            <h2 className="text-xl font-semibold text-foreground">{d.title}</h2>
            <p className="mt-2 line-clamp-3 text-[15px] leading-[22px] text-muted-foreground">
              {d.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Podcast className="h-5 w-5" strokeWidth={2} aria-hidden />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {d.authorName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {d.authorSubtitle}
                </div>
              </div>
            </div>
          </div>
        </button>
      </article>

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={d.title}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close dialog"
            onClick={closeModal}
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 bg-[var(--navy-dark)] px-4 py-3 text-left text-sm font-semibold text-white">
              <span className="truncate">{d.title}</span>
              <button
                type="button"
                onClick={closeModal}
                className="shrink-0 rounded-md px-2 py-1 text-white/90 hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="relative w-full px-6 py-6 sm:px-8 sm:py-8">
              <div className="space-y-4 text-[var(--navy)]">
                <p className="text-sm leading-relaxed text-[var(--slate)]">
                  {d.excerpt}
                </p>
                <iframe
                  title={d.title}
                  src={d.spotifyEmbedSrc}
                  className="h-[352px] w-full max-w-full rounded-lg border-0 bg-black"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
                <a
                  href={d.episodePageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Open episode on Spotify for Creators
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function StaticPodcastCard({ item }: { item: InsurancePodcastShowcase }) {
  const external = item.listenUrl.startsWith("http");
  const hasAudio = item.audioUrl && item.audioUrl.length > 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
        <p className="mt-2 line-clamp-3 text-[15px] leading-[22px] text-muted-foreground">
          {item.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
            <Image
              src={item.avatar}
              alt=""
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              {item.authorName}
            </div>
            <div className="text-xs text-muted-foreground">
              {item.authorSubtitle}
            </div>
          </div>
        </div>
        {hasAudio && (
          <audio
            controls
            preload="none"
            src={item.audioUrl}
            className="mt-4 h-10 w-full"
          />
        )}
        {!hasAudio && (
          <div className="mt-4 flex items-center justify-end gap-2">
            {external ? (
              <a
                href={item.listenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Listen to podcast
              </a>
            ) : (
              <Link
                href={item.listenUrl}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Listen to podcast
              </Link>
            )}
            {external ? (
              <a
                href={item.listenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                aria-label={`Listen to ${item.title}`}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
              </a>
            ) : (
              <Link
                href={item.listenUrl}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                aria-label={`Listen to ${item.title}`}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export type PodcastPageClientProps =
  | { mode: "rss"; episodes: PodcastEpisode[]; channelTitle?: string }
  | { mode: "static"; items: InsurancePodcastShowcase[] }
  | { mode: "hybrid"; firstItem: InsurancePodcastShowcase };

export function PodcastPageClient(props: PodcastPageClientProps) {
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
          {props.mode === "rss" && props.channelTitle ? (
            <p className="mt-2 text-sm text-muted-foreground">
              RSS feed: {props.channelTitle}
            </p>
          ) : props.mode === "rss" ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Latest episodes from our RSS feeds (newest first).
            </p>
          ) : props.mode === "hybrid" ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Featured episode from our team and the Texas Department of
              Insurance.
            </p>
          ) : null}
          {props.mode === "rss" && props.episodes.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              The feed URL is set but no playable episodes were returned. Check
              that the RSS includes audio enclosures and that the URL is
              reachable from the server.
            </p>
          ) : null}
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <PageShell>
          {props.mode === "rss" ? (
            props.episodes.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No episodes to display.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {props.episodes.map((item) => (
                  <RssEpisodeCard
                    key={item.id}
                    item={item}
                    channelTitle={props.channelTitle}
                  />
                ))}
              </div>
            )
          ) : props.mode === "hybrid" ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <StaticPodcastCard
                key={props.firstItem.id}
                item={props.firstItem}
              />
              <TexasFeaturedPodcastCard />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {props.items.map((item) => (
                <StaticPodcastCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </PageShell>
      </section>
    </>
  );
}
