"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSpotify, FaItunesNote, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useCart } from "@/app/context/CartContext";
import { useLocale } from "@/app/context/LocaleContext";
import LanguageToggle from "@/app/components/LanguageToggle";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count, toggleCart } = useCart();
  const { t } = useLocale();

  const socialLinks = [
    { name: "Spotify", href: "https://open.spotify.com/artist/1xHULzyUFuJ0XJ6ZuoYFzA", icon: FaSpotify },
    { name: "Apple Music", href: "https://music.apple.com/us/artist/tgbeam/1446845114", icon: FaItunesNote },
    { name: "YouTube", href: "https://www.youtube.com/@tgbeam444", icon: FaYoutube },
    { name: "Instagram", href: "https://www.instagram.com/tgbeam_/", icon: FaInstagram },
    { name: "TikTok", href: "https://www.tiktok.com/@tgbeam_", icon: SiTiktok },
  ];

  const marqueeMessage = t("marquee");

  return (
    <header className="tgbeam-header sticky top-0 w-full bg-white border-b border-zinc-200">
      <nav className="relative z-[2] w-full">
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-20 px-6 overflow-visible">
          {/* Left: Music dropdown */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2">
            <div className="group nav-dropdown">
              <button
                type="button"
                aria-haspopup="true"
                className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-900 transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
              >
                {t("navMusic")}
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="nav-dropdown-menu hidden group-hover:block group-focus-within:block">
                <Link
                  href="/music"
                  className="block px-4 py-2 text-xs uppercase tracking-wider text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                >
                  {t("navMusic")}
                </Link>
                <Link
                  href="/videos"
                  className="block px-4 py-2 text-xs uppercase tracking-wider text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                >
                  {t("navVideos")}
                </Link>
              </div>
            </div>
          </div>

          {/* Center: Logo + Social Icons — viewport-centered */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
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

          {/* Right: Language toggle + Shop + Cart */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-6">
            <LanguageToggle />
            <Link
              href="/shop"
              className="text-zinc-700 hover:text-zinc-900 transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
            >
              {t("shop")}
            </Link>
            <button
              type="button"
              onClick={toggleCart}
              aria-label={`${t("cart")} (${count})`}
              className="text-zinc-700 hover:text-zinc-900 transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
            >
              {t("cart")}{count > 0 ? ` (${count})` : ""}
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden max-w-6xl mx-auto px-6">
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

            {/* Right: Language toggle + Cart */}
            <div className="flex items-center gap-3">
              <LanguageToggle className="text-[0.7rem]" />
              <button
                type="button"
                onClick={toggleCart}
                aria-label={`${t("cart")} (${count})`}
                className="text-[0.7rem] uppercase tracking-wider font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
              >
                {t("cart")}{count > 0 ? ` (${count})` : ""}
              </button>
            </div>
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
                  {t("navMusic")}
                </Link>
                <Link
                  href="/shop"
                  className="text-zinc-700 hover:text-zinc-900 transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("shop")}
                </Link>
                <Link
                  href="/videos"
                  className="text-zinc-700 hover:text-zinc-900 transition-opacity hover:opacity-80 uppercase tracking-wider text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navVideos")}
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
      
      {/* Scrolling announcement bar */}
      <Link
        href="/shop"
        aria-label="Shop Japan merch"
        className="tgbeam-scrolling-banner block w-full border-y border-zinc-200 bg-white cursor-pointer"
      >
        <div className="tgbeam-marquee-container py-2">
          <div className="tgbeam-marquee-track font-punto text-lg md:text-lg tracking-[0.25em] uppercase text-zinc-900">
            {/* First copy of message */}
            <div className="flex gap-12 pr-16">
              <span>{marqueeMessage}</span>
            </div>
            {/* Second copy of message (identical, for seamless loop) */}
            <div className="flex gap-12 pr-16" aria-hidden="true">
              <span>{marqueeMessage}</span>
            </div>
          </div>
        </div>
      </Link>
    </header>
  );
}
