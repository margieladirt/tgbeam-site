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
      className="min-w-[220px] max-w-xs flex-shrink-0 bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col items-center space-y-4"
    >
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
          className="block w-full text-xs tracking-wide uppercase border border-zinc-300 text-zinc-700 py-2 rounded-full text-center hover:border-zinc-500 hover:text-zinc-900 transition"
        >
          Listen Now
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, [isMobile]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollByAmount = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = direction === "left" ? -300 : 300;
    carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
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

      <section className="border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-6">
          <header className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900">
                Latest Singles
              </h2>
              <p className="mt-1 text-sm font-extralight text-zinc-600">
                Scroll through my recent releases.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByAmount("left")}
                className="px-3 py-1 text-xs uppercase tracking-wide border border-zinc-300 rounded-full hover:border-zinc-500 text-zinc-700 hover:text-zinc-900 transition"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount("right")}
                className="px-3 py-1 text-xs uppercase tracking-wide border border-zinc-300 rounded-full hover:border-zinc-500 text-zinc-700 hover:text-zinc-900 transition"
              >
                Next
              </button>
            </div>
          </header>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]"
          >
            {singles.map((single) => (
              <SingleCard key={single.slug} single={single} />
            ))}
          </div>
        </div>
      </section>
      
    </>
  );
}
