import type { Metadata } from "next";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  paymentLink: string;
};

const products: Product[] = [
  {
    id: "japan-shirt-black",
    title: "TGBEAM JAPAN SHIRT - BLACK",
    price: 6000,
    image: "/images/shop/japan-shirt-black.svg",
    paymentLink: "https://buy.stripe.com/6oUbJ2aYm8IY1ZwfWGdZ602",
  },
  {
    id: "japan-shirt-white",
    title: "TGBEAM JAPAN SHIRT - WHITE",
    price: 6000,
    image: "/images/shop/japan-shirt-white.svg",
    paymentLink: "https://buy.stripe.com/3cI00kgiG7EU47E11MdZ601",
  },
  {
    id: "japan-tote",
    title: "TGBEAM JAPAN TOTE",
    price: 5000,
    image: "/images/shop/japan-tote.svg",
    paymentLink: "https://buy.stripe.com/dRmaEYfeC9N2fQmh0KdZ603",
  },
];

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
            <article key={product.id} className="flex flex-col">
              <div className="relative aspect-[4/5] w-full mb-8">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain object-center"
                />
              </div>

              <div className="space-y-3 text-left">
                <h2 className="text-xs tracking-[0.18em] uppercase text-zinc-900">
                  {product.title}
                </h2>
                <p className="text-sm text-zinc-900">¥{product.price.toLocaleString()}</p>
                <a
                  href={product.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-1 text-xs tracking-[0.22em] uppercase text-zinc-900 hover:opacity-50 transition-opacity"
                >
                  BUY NOW
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
