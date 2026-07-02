"use client";

import { useLocale } from "@/app/context/LocaleContext";

export default function SiteFooter() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 border-t border-zinc-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-zinc-600">
        © {currentYear} TGBEAM. {t("rightsReserved")}
      </div>
    </footer>
  );
}
