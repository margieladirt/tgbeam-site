import type { Metadata } from "next";
import { products } from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop — TGBEAM",
  description: "Exclusive merch from the Japan show.",
};

export default function Shop() {
  return (
    <section className="min-h-screen bg-white font-sans">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <header className="text-center space-y-6 mb-20 md:mb-32">
          <h1 className="text-sm md:text-base tracking-[0.22em] uppercase text-zinc-900">
            EXCLUSIVE MERCH FROM THE JAPAN SHOW
          </h1>
          <p className="max-w-2xl mx-auto text-sm font-light text-zinc-600 leading-relaxed">
            A limited edition TGBEAM merch capsule designed by Leeann Huang for
            the Tokyo show. Featuring shirts and totes in limited quantities.
            Tokyo handoff available until July 11th. Shipping available after
            July 11th.
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
