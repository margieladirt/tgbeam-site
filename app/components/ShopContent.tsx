"use client";

import { products } from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";
import { useLocale } from "@/app/context/LocaleContext";

export default function ShopContent() {
  const { t } = useLocale();

  return (
    <section className="min-h-screen bg-white font-sans">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <header className="text-center space-y-6 mb-20 md:mb-32">
          <h1 className="text-sm md:text-base tracking-[0.22em] uppercase text-zinc-900">
            {t("shopTitle")}
          </h1>
          <p className="max-w-2xl mx-auto text-sm font-light text-zinc-600 leading-relaxed">
            {t("shopIntro")}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 md:gap-x-12 md:gap-y-24">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
