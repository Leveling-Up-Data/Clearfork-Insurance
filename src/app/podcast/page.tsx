"use client";

import { useState } from "react";
import { Headphones, Play, X } from "lucide-react";

const EPISODES = [
  {
    spotifyId: "placeholder-episode-1",
    title: "Insurance 101: What Every Homeowner Needs to Know",
    description:
      "In our debut episode, we break down the essentials of homeowners insurance — what's covered, what's not, and how to make sure you're properly protected.",
    date: "Coming Soon",
  },
  {
    spotifyId: "placeholder-episode-2",
    title: "Commercial Insurance: Protecting Your Business",
    description:
      "Learn about the key commercial insurance policies every business owner should consider, from general liability to workers' compensation.",
    date: "Coming Soon",
  },
];

export default function PodcastPage() {
  const [activeEpisode, setActiveEpisode] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Headphones className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Our Podcast
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Expert insurance insights, tips, and stories from the Clearfork
            team. Listen in to learn how to better protect what matters most.
          </p>
        </div>
      </section>

      {/* Episode List */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-6">
            {EPISODES.map((episode) => (
              <div
                key={episode.spotifyId}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => setActiveEpisode(episode.spotifyId)}
                    className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                    aria-label={`Play ${episode.title}`}
                  >
                    <Play className="ml-0.5 h-5 w-5" />
                  </button>
                  <div className="flex-1">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {episode.date}
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {episode.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {episode.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotify Embed Modal */}
      {activeEpisode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveEpisode(null)}
        >
          <div
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveEpisode(null)}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close player"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-xl bg-card p-6 text-center">
              <Headphones className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Coming Soon
              </h3>
              <p className="text-sm text-muted-foreground">
                Our podcast episodes are being produced and will be available on
                Spotify soon. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
