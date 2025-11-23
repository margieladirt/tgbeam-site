"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Ensure video starts playing and muted
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, []);

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
        >
          <source src="/videos/hero_video_temp.mov" type="video/mp4" />
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
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Content */}
        <div className="relative z-20 w-full max-w-3xl mx-auto px-6 py-20 md:py-0">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            {/* Pill Label */}
            {/* <div className="mb-6 px-4 py-1.5 rounded-full bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 inline-block">
      <span className="text-xs font-medium text-zinc-300 tracking-wider">
        TGBEAM · Artist / Producer
      </span>
    </div> */}

            {/* Headline */}
            {/* <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
      WELCOME TO THE TGBEAM WORLD
    </h1> */}

            {/* Subtext */}
            {/* <p className="mb-8 max-w-2xl text-lg md:text-xl text-zinc-300 leading-relaxed">
      Blending emo rap, cloud rap, and experimental pop into a unique
      sonic landscape. Where raw emotion meets atmospheric production.
    </p> */}
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
              <Link
                href="https://open.spotify.com/artist/1xHULzyUFuJ0XJ6ZuoYFzA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-zinc-100 transition-colors text-center"
              >
                Listen to the latest single
              </Link>
              <Link
                href="/newsletter"
                className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-base hover:bg-white/10 transition-colors text-center"
              >
                Join the email list
              </Link>
            </div>
            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
              <Link
                href="#"
                className="text-zinc-300 hover:text-white transition-colors font-medium"
              >
                Spotify
              </Link>
              <Link
                href="#"
                className="text-zinc-300 hover:text-white transition-colors font-medium"
              >
                Apple Music
              </Link>
              <Link
                href="#"
                className="text-zinc-300 hover:text-white transition-colors font-medium"
              >
                YouTube
              </Link>
              <Link
                href="#"
                className="text-zinc-300 hover:text-white transition-colors font-medium"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-zinc-300 hover:text-white transition-colors font-medium"
              >
                TikTok
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
