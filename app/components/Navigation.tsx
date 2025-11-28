"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSpotify, FaItunesNote, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const socialLinks = [
    { name: "Spotify", href: "https://open.spotify.com/artist/1xHULzyUFuJ0XJ6ZuoYFzA", icon: FaSpotify },
    { name: "Apple Music", href: "https://music.apple.com/us/artist/tgbeam/1446845114", icon: FaItunesNote },
    { name: "YouTube", href: "https://www.youtube.com/@tgbeam444", icon: FaYoutube },
    { name: "Instagram", href: "https://www.instagram.com/tgtolu/", icon: FaInstagram },
    { name: "TikTok", href: "https://www.tiktok.com/@tgtolu", icon: SiTiktok },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200">
      <nav className="max-w-6xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Left: Music */}
          <Link
            href="/music"
            className="text-zinc-700 hover:text-zinc-900 transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
          >
            Music
          </Link>

          {/* Center: Logo + Social Icons */}
          <div className="flex flex-col items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-zinc-900 uppercase tracking-tight mb-2 hover:opacity-90 transition-opacity"
            >
              TGBEAM
            </Link>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-zinc-600 hover:text-zinc-900 hover:opacity-80 transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Videos */}
          <Link
            href="/videos"
            className="text-zinc-700 hover:text-zinc-900 transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
          >
            Videos
          </Link>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-700 hover:text-zinc-900 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Center: Logo */}
            <Link
              href="/"
              className="text-xl font-bold text-zinc-900 uppercase tracking-tight hover:opacity-90 transition-opacity"
            >
              TGBEAM
            </Link>

            {/* Right: Spacer for symmetry */}
            <div className="w-6" />
          </div>

          {/* Hamburger Menu Dropdown */}
          {isMenuOpen && (
            <div className="pb-4 border-t border-zinc-200">
              <div className="flex flex-col items-center space-y-3 pt-4">
                <Link
                  href="/music"
                  className="text-zinc-700 hover:text-zinc-900 transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Music
                </Link>
                <Link
                  href="/videos"
                  className="text-zinc-700 hover:text-zinc-900 transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Videos
                </Link>
              </div>
            </div>
          )}

          {/* Social Icons Row */}
          <div className="flex items-center justify-center gap-4 py-4 border-t border-zinc-200">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-zinc-400 hover:text-white hover:opacity-80 transition-all"
                  aria-label={social.name}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
