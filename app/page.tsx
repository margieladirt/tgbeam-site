"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

type Single = {
  title: string;
  slug: string;
  staticImage: string;
  hoverGif?: string | null;
  hasVideo: boolean;
  videoUrl?: string | null;
  songUrl?: string | null;
};

const singles: Single[] = [
  {
    title: "Yabai Type Shit",
    slug: "yabai-type-shit",
    staticImage: "/images/singles/yabai-type-shit.jpg",
    hoverGif: null, // no hover GIF for this one
    hasVideo: false,
    songUrl: "https://ffm.to/yabaitg"
  },
  {
    title: "Like A Rockstar",
    slug: "like-a-rockstar",
    staticImage: "/images/singles/like-a-rockstar.jpg",
    hoverGif: "/images/singles/gifs/like-a-rockstarr.gif",
    hasVideo: true,
    songUrl: "https://ffm.to/rockstaraf",
    videoUrl: "https://youtu.be/-KZqpMFp1Zw?si=UtYi_dYhwS9q09O-"
  },
  {
    title: "Welcome To New York",
    slug: "welcome-to-new-york",
    staticImage: "/images/singles/welcome-to-new-york.png",
    hoverGif: "/images/singles/gifs/welcome-to-new-york.gif",
    hasVideo: true,
    songUrl: "https://fanlink.tv/welcome2newyork",
    videoUrl: "https://www.youtube.com/watch?v=L8NroMStLwQ&list=RDL8NroMStLwQ&start_radio=1&pp=ygUad2VsY29tZSB0byBuZXcgeW9yayB0Z2JlYW2gBwE%3D"
  },
  {
    title: "My Angel",
    slug: "my-angel",
    staticImage: "/images/singles/my-angel.jpg",
    hoverGif: "/images/singles/gifs/my-angell.gif",
    hasVideo: true,
    songUrl: "https://fanlink.tv/my_angel",
    videoUrl: "https://www.youtube.com/watch?v=tvkE32AlJyg"
  },
  {
    title: "Gorgeous",
    slug: "gorgeous",
    staticImage: "/images/singles/gorgeous.jpg",
    hoverGif: "/images/singles/gifs/gorgeous.gif",
    hasVideo: true,
    songUrl: "https://fanlink.tv/gorgeous444",
    videoUrl: "https://youtube.com/shorts/l3aua-YOM1g?si=oBU5aID_z1g4uOMr"
  },
  {
    title: "Bitchiest",
    slug: "bitchiest",
    staticImage: "/images/singles/bitchiest.jpg",
    hoverGif: "/images/singles/gifs/bitchiest.gif",
    hasVideo: true,
    songUrl: "https://fanlink.tv/bitchiest",
    videoUrl: "https://www.youtube.com/watch?v=u79ORcairAc"
  },
];

function SingleCard({ single }: { single: Single }) {
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc =
    isHovered && single.hoverGif
      ? single.hoverGif
      : single.staticImage;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto border border-zinc-200 rounded-xl p-6 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={single.staticImage}
          alt={single.title}
          fill
          sizes="100vw"
          className="object-cover blur-md scale-105 opacity-60"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-4">
        <Image
          src={imageSrc}
          alt={single.title}
          width={260}
          height={260}
          className="rounded-lg object-cover"
        />
        <h3 className="mt-2 text-base md:text-lg font-semibold text-center text-zinc-900">
          {single.title}
        </h3>

        <div className="w-full space-y-2">
          {single.hasVideo && (
            <a
              href={single.videoUrl || "#"}
              className="block w-full text-xs tracking-wide uppercase border border-zinc-900 bg-zinc-900 text-white py-2 rounded-full text-center hover:bg-zinc-800 transition"
            >
              Watch Video
            </a>
          )}
          <a
            href={single.songUrl || "#"}
            className="block w-full text-xs tracking-wide uppercase border border-zinc-300 bg-white text-zinc-700 py-2 rounded-full text-center hover:border-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition"
          >
            Listen Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSingleIndex, setCurrentSingleIndex] = useState(0);
  const [isSinglesHovered, setIsSinglesHovered] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Ensure video starts playing and muted
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = true;
      heroVideoRef.current.play();
    }
  }, [isMobile]);

  useEffect(() => {
    const tryPlay = () => {
      const video = heroVideoRef.current;
      if (!video) return;

      video
        .play()
        .catch(() => {
          // ignore autoplay errors
        });
    };

    tryPlay();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const gifsToPreload: string[] = [];

    // Preload hover GIFs from singles
    singles.forEach((single) => {
      if (single.hoverGif) {
        gifsToPreload.push(single.hoverGif);
      }
    });

    // If there are any other GIF paths you use on the homepage,
    // you can push them into gifsToPreload here as well.

    gifsToPreload.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
    });
  }, []);

  const togglePlay = () => {
    if (heroVideoRef.current) {
      if (isPlaying) {
        heroVideoRef.current.pause();
      } else {
        heroVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (isSinglesHovered || singles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSingleIndex((prev) =>
        prev + 1 >= singles.length ? 0 : prev + 1
      );
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, [isSinglesHovered, singles.length]);

  const currentSingle = singles[currentSingleIndex];

  return (
    <>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          key={isMobile ? "mobile" : "desktop"}
        >
          <source
            src={isMobile ? "/videos/hero_mobile.mov" : "/videos/hero_video_temp.mov"}
            type="video/mp4"
          />
        </video>

        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/80 z-10" /> */}

        {/* Video Controls */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-all hover:scale-110"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="p-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-all hover:scale-110"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </button>
        </div>
      </section>

      <section className="relative border-t border-zinc-200 bg-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 space-y-8">
          <header className="space-y-2 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
              Latest Singles
            </h2>
            <p className="mt-1 text-sm font-extralight text-zinc-600">
              Scroll through my recent releases.
            </p>
          </header>

          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsSinglesHovered(true)}
            onMouseLeave={() => setIsSinglesHovered(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSingleIndex * 100}%)`,
              }}
            >
              {singles.map((single) => (
                <div key={single.slug} className="min-w-full flex justify-center">
                  <SingleCard single={single} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() =>
                setCurrentSingleIndex((prev) =>
                  prev - 1 < 0 ? singles.length - 1 : prev - 1
                )
              }
              className="px-4 py-2 text-xs uppercase tracking-wide border border-zinc-700 rounded-full hover:border-black transition"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentSingleIndex((prev) =>
                  prev + 1 >= singles.length ? 0 : prev + 1
                )
              }
              className="px-4 py-2 text-xs uppercase tracking-wide border border-zinc-700 rounded-full hover:border-black transition"
            >
              Next
            </button>
          </div>
        </div>
      </section>
      
    </>
  );
}
