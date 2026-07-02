"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import { useLocale } from "@/app/context/LocaleContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    subtotal,
    currency,
    count,
  } = useCart();
  const { t } = useLocale();

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      setCheckoutError("");
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            lookupKey: item.lookupKey,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.error || "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setCheckoutError(t("checkoutError"));
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[1100] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-[1101] h-full w-full max-w-md bg-white flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-200">
          <h2 className="text-xs tracking-[0.22em] uppercase text-zinc-900">
            {t("cart")} ({count})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label={t("close")}
            className="text-xs tracking-[0.2em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            {t("close")}
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <p className="text-xs tracking-[0.18em] uppercase text-zinc-400">
              {t("emptyCart")}
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {items.map((item) => (
              <div key={item.key} className="flex gap-4">
                <div className="relative h-24 w-20 flex-shrink-0 bg-zinc-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-contain object-center"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-[0.7rem] tracking-[0.15em] uppercase text-zinc-900">
                      {item.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      aria-label={`${t("remove")} ${item.name}`}
                      className="text-[0.65rem] uppercase tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                      {t("remove")}
                    </button>
                  </div>

                  {item.selectedSize && (
                    <p className="text-[0.65rem] tracking-[0.15em] uppercase text-zinc-500">
                      {t("size")}: {item.selectedSize}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center border border-zinc-300">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.key)}
                        aria-label="Decrease quantity"
                        className="h-8 w-8 text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        −
                      </button>
                      <span className="h-8 w-8 flex items-center justify-center text-sm text-zinc-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.key)}
                        aria-label="Increase quantity"
                        className="h-8 w-8 text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-zinc-900">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-zinc-200 px-6 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.18em] uppercase text-zinc-500">
                {t("subtotal")}
              </span>
              <span className="text-sm text-zinc-900">
                {formatPrice(subtotal, currency)}
              </span>
            </div>

            {checkoutError && (
              <p className="text-[0.7rem] leading-relaxed text-zinc-600">
                {checkoutError}
              </p>
            )}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkoutLoading || items.length === 0}
              className="w-full px-6 py-3 bg-zinc-900 text-white text-xs tracking-[0.22em] uppercase hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkoutLoading ? t("processing") : t("checkout")}
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="w-full text-[0.65rem] tracking-[0.18em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              {t("clearCart")}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
