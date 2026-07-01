export type ProductSize = {
  label: string;
  stock: number;
  /** Stripe Price lookup key for this size. */
  lookupKey: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  /** Price in the smallest sensible whole unit for the currency (JPY has no decimals). */
  price: number;
  currency: string;
  image: string;
  hasSizes: boolean;
  sizes: ProductSize[];
  /** Stock for products without sizes. */
  stock?: number;
  /** Stripe Price lookup key for products without sizes. */
  lookupKey?: string;
};

export type CartItem = {
  /** Unique key per cart line: productId + selectedSize. */
  key: string;
  productId: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  selectedSize: string | null;
  quantity: number;
  /** Stripe Price lookup key; resolved server-side into a real price at checkout. */
  lookupKey: string;
};

// NOTE: Images below reuse the existing placeholder SVGs in /images/shop.
// Swap these paths for real photos (e.g. /images/merch/mountain-tee-white.jpg)
// whenever the assets are ready — nothing else needs to change.
export const products: Product[] = [
  {
    id: "mountain-tee-white",
    name: "TGBEAM x Leeann Huang Mountain Tee - White",
    description:
      "A limited edition TGBEAM merch capsule designed by Leeann Huang for the Tokyo show.",
    price: 6000,
    currency: "JPY",
    image: "/images/shop/japan-shirt-white.svg",
    hasSizes: true,
    sizes: [
      { label: "S", stock: 1, lookupKey: "mountain_tee_white_s" },
      { label: "M", stock: 4, lookupKey: "mountain_tee_white_m" },
      { label: "L", stock: 2, lookupKey: "mountain_tee_white_l" },
      { label: "XL", stock: 2, lookupKey: "mountain_tee_white_xl" },
    ],
  },
  {
    id: "mountain-tee-black",
    name: "TGBEAM x Leeann Huang Mountain Tee - Black",
    description:
      "A limited edition TGBEAM merch capsule designed by Leeann Huang for the Tokyo show.",
    price: 6000,
    currency: "JPY",
    image: "/images/shop/japan-shirt-black.svg",
    hasSizes: true,
    sizes: [
      { label: "S", stock: 0, lookupKey: "mountain_tee_black_s" },
      { label: "M", stock: 3, lookupKey: "mountain_tee_black_m" },
      { label: "L", stock: 3, lookupKey: "mountain_tee_black_l" },
      { label: "XL", stock: 2, lookupKey: "mountain_tee_black_xl" },
    ],
  },
  {
    id: "tote-bag",
    name: "TGBEAM Tote Bag",
    description: "Limited TGBEAM tote bag from the Japan merch capsule.",
    price: 5000,
    currency: "JPY",
    image: "/images/shop/japan-tote.svg",
    hasSizes: false,
    sizes: [],
    stock: 24,
    lookupKey: "tote_bag",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

/** Available stock for a product (and size, if applicable). Returns 0 if unknown. */
export function getAvailableStock(
  productId: string,
  selectedSize: string | null
): number {
  const product = getProduct(productId);
  if (!product) return 0;
  if (product.hasSizes) {
    return product.sizes.find((s) => s.label === selectedSize)?.stock ?? 0;
  }
  return product.stock ?? 0;
}

/** Stripe lookup key for a product (and size, if applicable). */
export function getLookupKey(
  productId: string,
  selectedSize: string | null
): string | null {
  const product = getProduct(productId);
  if (!product) return null;
  if (product.hasSizes) {
    return product.sizes.find((s) => s.label === selectedSize)?.lookupKey ?? null;
  }
  return product.lookupKey ?? null;
}

/** True if the product has no purchasable stock across all sizes. */
export function isProductSoldOut(product: Product): boolean {
  if (product.hasSizes) {
    return product.sizes.every((s) => s.stock <= 0);
  }
  return (product.stock ?? 0) <= 0;
}

/** Formats a price for display, e.g. formatPrice(6000, "JPY") -> "¥6,000". */
export function formatPrice(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "JPY" ? 0 : 2,
    }).format(amount);
  } catch {
    return `¥${amount.toLocaleString()}`;
  }
}
