"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

const VIDEOS = [
  {
    id: "a18d456Y0RQ",
    title: "Homeowners Insurance",
    description:
      "Learn what homeowners insurance covers, why it matters, and how to make sure you have the right protection for your property.",
  },
  {
    id: "KGDHxRv36mE",
    title: "Accidents and Disability",
    description:
      "Understand how accident and disability insurance can protect your income and provide financial security when the unexpected happens.",
  },
];

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Insurance Videos
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Watch our educational videos to learn more about the insurance
            products and coverage options that matter most to you and your
            family.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {VIDEOS.map((video) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video.id)}
                className="group overflow-hidden rounded-xl bg-gray-50 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-video">
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                      <Play className="ml-1 h-7 w-7" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {video.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video overflow-hidden rounded-xl">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
