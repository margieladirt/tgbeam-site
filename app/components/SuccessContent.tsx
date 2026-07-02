"use client";

import Link from "next/link";
import ClearCartOnMount from "@/app/components/ClearCartOnMount";
import { useLocale } from "@/app/context/LocaleContext";

export default function SuccessContent() {
  const { t } = useLocale();

  return (
    <section className="min-h-screen bg-white font-sans">
      <ClearCartOnMount />
      <div className="max-w-2xl mx-auto px-6 py-28 md:py-40 text-center space-y-6">
        <h1 className="text-sm md:text-base tracking-[0.22em] uppercase text-zinc-900">
          {t("successHeadline")}
        </h1>
        <p className="text-sm font-light text-zinc-600 leading-relaxed">
          {t("successBodyPrefix")}
          <a
            href="mailto:tolu@tgbeam.com"
            className="text-zinc-900 underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            tolu@tgbeam.com
          </a>
          {t("successBodyMid")}
          <a
            href="https://www.instagram.com/tgbeam_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-900 underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            @tgbeam_
          </a>
          {t("successBodySuffix")}
        </p>
        <Link
          href="/"
          className="inline-block pt-2 text-xs tracking-[0.22em] uppercase text-zinc-900 hover:opacity-50 transition-opacity"
        >
          {t("backToHome")}
        </Link>
      </div>
    </section>
  );
}
