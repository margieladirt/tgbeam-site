"use client";

import { useCart } from "@/app/context/CartContext";
import { useLocale } from "@/app/context/LocaleContext";
import type { Locale } from "@/app/data/products";

export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { language, setLanguage, t } = useLocale();
  const { items, clearCart } = useCart();

  const switchTo = (next: Locale) => {
    if (next === language) return;
    // Prevent mixed currencies: switching clears the cart, but only after confirm.
    if (items.length > 0) {
      const confirmed = window.confirm(t("switchConfirm"));
      if (!confirmed) return;
      clearCart();
    }
    setLanguage(next);
  };

  const base =
    "uppercase tracking-wider text-sm font-medium transition-opacity hover:opacity-80";

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-pressed={language === "en"}
        className={`${base} ${
          language === "en" ? "text-zinc-900" : "text-zinc-400"
        }`}
      >
        EN
      </button>
      <span className="text-zinc-300" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => switchTo("jp")}
        aria-pressed={language === "jp"}
        className={`${base} ${
          language === "jp" ? "text-zinc-900" : "text-zinc-400"
        }`}
      >
        JP
      </button>
    </div>
  );
}
