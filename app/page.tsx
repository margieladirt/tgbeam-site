import Link from "next/link";

export default function Home() {
  return (
    <><section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
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
    </section><section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
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
      </section></>
  );
}
