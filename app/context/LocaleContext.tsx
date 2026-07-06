"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Currency, Locale } from "@/app/data/products";

const STORAGE_KEY = "tgbeam-locale";

type Dictionary = {
  // Shop
  shopTitle: string;
  shopIntro: string;
  size: string;
  quantity: string;
  addToCart: string;
  soldOut: string;
  selectSize: string;
  maxInCart: string;
  addedToCart: string;
  // Cart
  cart: string;
  shop: string;
  close: string;
  emptyCart: string;
  remove: string;
  subtotal: string;
  checkout: string;
  processing: string;
  clearCart: string;
  checkoutError: string;
  switchConfirm: string;
  // Success
  successHeadline: string;
  successBodyPrefix: string;
  successBodyMid: string;
  successBodySuffix: string;
  backToHome: string;
  // Navigation
  navMusic: string;
  navVideos: string;
  marquee: string;
  // Home
  latestSingles: string;
  latestSinglesSub: string;
  watchVideo: string;
  listenNow: string;
  prev: string;
  next: string;
  muteVideo: string;
  unmuteVideo: string;
  // Music page
  musicTitle: string;
  musicSub: string;
  single: string;
  listen: string;
  // Videos page
  videosTitle: string;
  videosSub: string;
  officialVideo: string;
  closeVideo: string;
  // Footer
  rightsReserved: string;
  // Laylo popup
  layloAria: string;
  layloTitle: string;
  layloCopy: string;
  layloSignup: string;
};

const translations: Record<Locale, Dictionary> = {
  en: {
    shopTitle: "LIMITED EDITION TGBEAM MERCH CAPSULE",
    shopIntro:
      "A limited edition TGBEAM merch capsule designed by Leeann Huang for the Tokyo show. Featuring shirts and totes in limited quantities. Tokyo handoff available until July 11th. Shipping available after July 11th.",
    size: "Size",
    quantity: "Quantity",
    addToCart: "Add to Cart",
    soldOut: "Sold Out",
    selectSize: "Select a size",
    maxInCart: "Max available in cart",
    addedToCart: "Added to cart — view cart",
    cart: "CART",
    shop: "Shop",
    close: "Close",
    emptyCart: "Your cart is empty",
    remove: "Remove",
    subtotal: "Subtotal",
    checkout: "Checkout",
    processing: "Processing…",
    clearCart: "Clear cart",
    checkoutError: "Checkout failed. Please try again.",
    switchConfirm:
      "Switching language will clear your cart. Continue?\n言語を切り替えるとカートが空になります。続行しますか？",
    successHeadline: "Thank you for your order.",
    successBodyPrefix:
      "You will receive a confirmation email shortly. For Tokyo handoff or shipping questions, contact TGBEAM at ",
    successBodyMid: " or via Instagram at ",
    successBodySuffix: ".",
    backToHome: "Back to Home",
    navMusic: "Music",
    navVideos: "Videos",
    marquee: "TAP HERE TO SHOP THE TOKYO CAPSULE →",
    latestSingles: "Latest Singles",
    latestSinglesSub: "Scroll through my recent releases.",
    watchVideo: "Watch Video",
    listenNow: "Listen Now",
    prev: "Prev",
    next: "Next",
    muteVideo: "Mute video",
    unmuteVideo: "Unmute video",
    musicTitle: "Music",
    musicSub:
      "Explore my releases and tap any cover to listen on your favorite platform.",
    single: "Single",
    listen: "Listen",
    videosTitle: "Videos",
    videosSub:
      "Official music videos, visualizers, and clips from the TGBEAM world.",
    officialVideo: "Official video",
    closeVideo: "Close ✕",
    rightsReserved: "All rights reserved.",
    layloAria: "Sign up for updates",
    layloTitle: "SIGN UP FOR UPDATES",
    layloCopy:
      "Sign up for updates and receive a discount code for the exclusive TGBEAM merch capsule designed by Leeann Huang.",
    layloSignup: "Sign up on Laylo",
  },
  jp: {
    shopTitle: "TGBEAM 限定マーチカプセル",
    shopIntro:
      "Leeann Huangがデザインした東京公演のためのTGBEAM限定マーチカプセル。シャツとトートを数量限定で展開。東京での受け渡しは7月11日まで、配送は7月11日以降に対応します。",
    size: "サイズ",
    quantity: "数量",
    addToCart: "カートに追加",
    soldOut: "完売",
    selectSize: "サイズを選択",
    maxInCart: "在庫上限に達しました",
    addedToCart: "カートに追加しました — カートを見る",
    cart: "カート",
    shop: "ショップ",
    close: "閉じる",
    emptyCart: "カートは空です",
    remove: "削除",
    subtotal: "小計",
    checkout: "購入手続きへ",
    processing: "処理中…",
    clearCart: "カートを空にする",
    checkoutError: "購入手続きに失敗しました。もう一度お試しください。",
    switchConfirm:
      "言語を切り替えるとカートが空になります。続行しますか？\nSwitching language will clear your cart. Continue?",
    successHeadline: "ご注文ありがとうございます。",
    successBodyPrefix:
      "まもなく確認メールが届きます。東京での受け渡しや配送についての質問は、",
    successBodyMid: " または Instagram ",
    successBodySuffix: " までご連絡ください。",
    backToHome: "ホームに戻る",
    navMusic: "ミュージック",
    navVideos: "ビデオ",
    marquee: "タップして東京カプセルをチェック →",
    latestSingles: "最新シングル",
    latestSinglesSub: "最近のリリースをチェック。",
    watchVideo: "ビデオを見る",
    listenNow: "今すぐ聴く",
    prev: "前へ",
    next: "次へ",
    muteVideo: "ミュートする",
    unmuteVideo: "ミュート解除",
    musicTitle: "ミュージック",
    musicSub:
      "リリースを見て、カバーをタップしてお好きなプラットフォームで聴いてください。",
    single: "シングル",
    listen: "聴く",
    videosTitle: "ビデオ",
    videosSub:
      "TGBEAMの世界の公式ミュージックビデオ、ビジュアライザー、クリップ。",
    officialVideo: "公式ビデオ",
    closeVideo: "閉じる ✕",
    rightsReserved: "無断転載を禁じます。",
    layloAria: "アップデートに登録",
    layloTitle: "アップデートに登録",
    layloCopy:
      "登録すると、Leeann Huangがデザインした限定TGBEAMマーチカプセルの割引コードがもらえます。",
    layloSignup: "Layloで登録",
  },
};

function currencyFor(language: Locale): Currency {
  return language === "jp" ? "JPY" : "USD";
}

type LocaleContextValue = {
  language: Locale;
  currency: Currency;
  setLanguage: (language: Locale) => void;
  t: (key: keyof Dictionary) => string;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "jp") {
      setLanguageState(stored);
      return;
    }
    // Default to JP only if the browser language is Japanese.
    if (navigator.language?.toLowerCase().startsWith("ja")) {
      setLanguageState("jp");
    }
  }, []);

  const setLanguage = useCallback((next: Locale) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  }, []);

  const t = useCallback(
    (key: keyof Dictionary) => translations[language][key],
    [language]
  );

  const value: LocaleContextValue = {
    language,
    currency: currencyFor(language),
    setLanguage,
    t,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
