"use client";

import { useState } from "react";
import Image from "next/image";

type Video = {
  title: string;
  youtubeId: string;
  category?: string;
};

const videos: Video[] = [
  {
    title: "Like A Rockstar",
    youtubeId: "-KZqpMFp1Zw",
  },
  {
    title: "Welcome To New York",
    youtubeId: "L8NroMStLwQ",
  },
  {
    title: "My Angel",
    youtubeId: "tvkE32AlJyg",
  },
  {
    title: "Gorgeous",
    youtubeId: "l3aua-YOM1g",
  },
  {
    title: "Bitchiest",
    youtubeId: "u79ORcairAc",
  },
];

export default function Page() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <header className="border-b border-zinc-200 pb-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
          Videos
        </h1>
        <p className="mt-2 text-sm font-extralight text-zinc-600">
          Official music videos, visualizers, and clips from the TGBEAM world.
        </p>
      </header>

      <section className="space-y-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

            return (
              <button
                key={video.youtubeId}
                type="button"
                onClick={() => setActiveVideoId(video.youtubeId)}
                className="group text-left focus:outline-none"
              >
                <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
                  <Image
                    src={thumbnailUrl}
                    alt={video.title}
                    width={640}
                    height={360}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                  {/* dark overlay + play icon */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black text-xs font-semibold tracking-[0.2em] uppercase">
                      ▶
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs font-extralight text-zinc-500">
                  Official video
                </p>
                <h2 className="text-sm md:text-base font-semibold tracking-tight text-zinc-900">
                  {video.title}
                </h2>
              </button>
            );
          })}
        </div>
      </section>

      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-10 right-0 text-sm uppercase tracking-[0.2em] text-white hover:opacity-70"
            >
              Close ✕
            </button>

            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="TGBEAM video player"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
