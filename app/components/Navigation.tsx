"use client";

import Link from "next/link";

export default function Navigation() {
  const socialLinks = [
    { name: "Spotify", href: "#" },
    { name: "Apple Music", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "TikTok", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-zinc-800">
      <nav className="max-w-6xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Left: Music */}
          <Link
            href="/music"
            className="text-zinc-300 hover:text-white transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
          >
            Music
          </Link>

          {/* Center: Logo + Social Icons */}
          <div className="flex flex-col items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-white uppercase tracking-tight mb-2 hover:opacity-90 transition-opacity"
            >
              TGBEAM
            </Link>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-zinc-400 hover:text-white transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-xs font-medium">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Videos */}
          <Link
            href="/videos"
            className="text-zinc-300 hover:text-white transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
          >
            Videos
          </Link>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden py-4 space-y-4">
          {/* First Row: Logo */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="text-xl font-bold text-white uppercase tracking-tight hover:opacity-90 transition-opacity"
            >
              TGBEAM
            </Link>
          </div>

          {/* Second Row: Social Icons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-zinc-400 hover:text-white transition-all hover:scale-110"
                aria-label={social.name}
              >
                <span className="text-xs font-medium">{social.name}</span>
              </Link>
            ))}
          </div>

          {/* Third Row: Music and Videos */}
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/music"
              className="text-zinc-300 hover:text-white transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
            >
              Music
            </Link>
            <Link
              href="/videos"
              className="text-zinc-300 hover:text-white transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
            >
              Videos
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
