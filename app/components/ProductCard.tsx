"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  formatPrice,
  getAvailableStock,
  getPrice,
  isProductSoldOut,
  type Product,
} from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import { useLocale } from "@/app/context/LocaleContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart, items } = useCart();
  const { language, currency, t } = useLocale();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const needsSize = product.hasSizes;
  const soldOut = isProductSoldOut(product);

  // Stock available for the current selection.
  const selectionStock = useMemo(() => {
    if (needsSize && !selectedSize) return 0;
    return getAvailableStock(product.id, needsSize ? selectedSize : null);
  }, [product.id, needsSize, selectedSize]);

  // How many of this exact selection are already in the cart.
  const inCartQty = useMemo(() => {
    const key = selectedSize ? `${product.id}__${selectedSize}` : product.id;
    return items.find((item) => item.key === key)?.quantity ?? 0;
  }, [items, product.id, selectedSize]);

  const remaining = Math.max(0, selectionStock - inCartQty);
  const sizeChosen = !needsSize || selectedSize !== null;
  const canAdd = !soldOut && sizeChosen && remaining > 0 && quantity <= remaining;

  const handleSelectSize = (label: string) => {
    setSelectedSize(label);
    setQuantity(1);
  };

  const handleAdd = () => {
    if (!canAdd) return;
    addItem({ product, selectedSize, quantity });
    setAdded(true);
    setQuantity(1);
    setSelectedSize(null);
    window.setTimeout(() => setAdded(false), 2500);
  };

  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/5] w-full mb-8">
        <Image
          src={product.image}
          alt={product.name[language]}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={`object-contain object-center ${soldOut ? "opacity-50" : ""}`}
        />
        {soldOut && (
          <span className="absolute top-3 left-3 bg-zinc-900 text-white text-[0.6rem] tracking-[0.2em] uppercase px-2 py-1">
            {t("soldOut")}
          </span>
        )}
      </div>

      <div className="space-y-4 text-left">
        <div className="space-y-2">
          <h2 className="text-xs tracking-[0.18em] uppercase text-zinc-900">
            {product.name[language]}
          </h2>
          <p className="text-sm text-zinc-900">
            {formatPrice(getPrice(product, currency), currency)}
          </p>
          <p className="text-xs font-light text-zinc-500 leading-relaxed">
            {product.description[language]}
          </p>
        </div>

        {needsSize && (
          <div className="space-y-2">
            <span className="block text-[0.65rem] tracking-[0.18em] uppercase text-zinc-500">
              {t("size")}
            </span>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size.label;
                const sizeSoldOut = size.stock <= 0;
                return (
                  <button
                    key={size.label}
                    type="button"
                    disabled={sizeSoldOut}
                    onClick={() => handleSelectSize(size.label)}
                    className={`h-9 min-w-9 px-3 border text-xs uppercase tracking-wider transition-colors ${
                      isSelected
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-300 text-zinc-700 hover:border-zinc-900"
                    } ${
                      sizeSoldOut
                        ? "opacity-40 cursor-not-allowed line-through"
                        : ""
                    }`}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {!soldOut && (
          <div className="space-y-2">
            <span className="block text-[0.65rem] tracking-[0.18em] uppercase text-zinc-500">
              {t("quantity")}
            </span>
            <div className="inline-flex items-center border border-zinc-300">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="h-9 w-9 text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                −
              </button>
              <span className="h-9 w-10 flex items-center justify-center text-sm text-zinc-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) =>
                    remaining > 0 ? Math.min(q + 1, remaining) : q
                  )
                }
                disabled={!sizeChosen || quantity >= remaining}
                aria-label="Increase quantity"
                className="h-9 w-9 text-zinc-700 hover:bg-zinc-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>
        )}

        <div className="pt-1">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs tracking-[0.22em] uppercase transition-colors ${
              canAdd
                ? "bg-zinc-900 text-white hover:bg-zinc-700"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
          >
            {soldOut ? t("soldOut") : t("addToCart")}
          </button>

          {!soldOut && needsSize && !selectedSize && (
            <p className="mt-2 text-[0.65rem] tracking-[0.15em] uppercase text-zinc-400">
              {t("selectSize")}
            </p>
          )}

          {!soldOut && sizeChosen && remaining <= 0 && (
            <p className="mt-2 text-[0.65rem] tracking-[0.15em] uppercase text-zinc-400">
              {t("maxInCart")}
            </p>
          )}

          {added && (
            <button
              type="button"
              onClick={openCart}
              className="mt-2 block text-[0.65rem] tracking-[0.15em] uppercase text-zinc-900 hover:opacity-60 transition-opacity"
            >
              {t("addedToCart")}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
