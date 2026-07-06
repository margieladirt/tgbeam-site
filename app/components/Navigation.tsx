"use client";

import Link from "next/link";
import { FaSpotify, FaItunesNote, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useCart } from "@/app/context/CartContext";
import { useLocale } from "@/app/context/LocaleContext";
import LanguageToggle from "@/app/components/LanguageToggle";

export default function Navigation() {
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
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Left: Logo + EN/JP toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/"
                className="text-xl font-bold text-zinc-900 uppercase tracking-tight hover:opacity-90 transition-opacity"
              >
                TGBEAM
              </Link>
              <LanguageToggle className="text-[0.65rem]" />
            </div>

            {/* Right: Shop, Music, Videos, Cart */}
            <div className="flex items-center gap-2.5 text-[0.65rem] uppercase tracking-wider font-medium">
              <Link
                href="/shop"
                className="text-zinc-700 hover:text-zinc-900 transition-colors"
              >
                {t("shop")}
              </Link>
              <Link
                href="/music"
                className="text-zinc-700 hover:text-zinc-900 transition-colors"
              >
                {t("navMusic")}
              </Link>
              <Link
                href="/videos"
                className="text-zinc-700 hover:text-zinc-900 transition-colors"
              >
                {t("navVideos")}
              </Link>
              <button
                type="button"
                onClick={toggleCart}
                aria-label={`${t("cart")} (${count})`}
                className="text-zinc-700 hover:text-zinc-900 transition-colors"
              >
                {t("cart")}{count > 0 ? ` (${count})` : ""}
              </button>
            </div>
          </div>

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
          <div className="tgbeam-marquee-track font-punto text-[0.7rem] tracking-[0.15em] md:text-lg md:tracking-[0.25em] uppercase text-zinc-900">
            {/* Two identical groups; each repeats the message enough times to
                exceed the viewport width so the loop is seamless (no gap). */}
            {[0, 1].map((group) => (
              <div
                key={group}
                className="flex shrink-0 gap-16 pr-16"
                aria-hidden={group === 1}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="whitespace-nowrap">
                    {marqueeMessage}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </header>
  );
}
