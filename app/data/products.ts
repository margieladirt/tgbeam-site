export type Locale = "en" | "jp";
export type Currency = "USD" | "JPY";

export type LocalizedText = { en: string; jp: string };
export type LookupKeys = { USD: string; JPY: string };
export type Money = { amount: number; currency: Currency };

export type ProductSize = {
  label: string;
  stock: number;
  /** Currency-specific Stripe Price lookup keys. */
  lookupKeys: LookupKeys;
};

export type Product = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  prices: { USD: Money; JPY: Money };
  image: string;
  hasSizes: boolean;
  sizes: ProductSize[];
  /** Stock for products without sizes. */
  stock?: number;
  /** Currency-specific Stripe Price lookup keys for products without sizes. */
  lookupKeys?: LookupKeys;
};

export type CartItem = {
  /** Unique key per cart line: productId + selectedSize. */
  key: string;
  productId: string;
  /** Product name in the language selected when it was added. */
  name: string;
  /** Unit price in the selected currency. */
  price: number;
  currency: Currency;
  image: string;
  selectedSize: string | null;
  quantity: number;
  /** Currency-specific Stripe Price lookup key, resolved server-side at checkout. */
  lookupKey: string;
};

const MERCH_DESCRIPTION: LocalizedText = {
  en: "Limited edition TGBEAM merch designed by Leeann Huang.",
  jp: "Leeann Huangがデザインした限定TGBEAMマーチ。",
};

// NOTE: Images reuse the existing placeholder SVGs in /images/shop.
// Swap these paths for real photos (e.g. /images/merch/mountain-tee-white.jpg)
// whenever the assets are ready — nothing else needs to change.
export const products: Product[] = [
  {
    id: "mountain-tee-white",
    name: {
      en: "TGBEAM x Leeann Huang Mountain Tee - White",
      jp: "TGBEAM x Leeann Huang マウンテンTシャツ - ホワイト",
    },
    description: MERCH_DESCRIPTION,
    prices: {
      USD: { amount: 45, currency: "USD" },
      JPY: { amount: 6000, currency: "JPY" },
    },
    image: "/images/shop/japan-shirt-white.svg",
    hasSizes: true,
    sizes: [
      {
        label: "S",
        stock: 1,
        lookupKeys: {
          USD: "mountain_tee_white_s_usd",
          JPY: "mountain_tee_white_s_jpy",
        },
      },
      {
        label: "M",
        stock: 4,
        lookupKeys: {
          USD: "mountain_tee_white_m_usd",
          JPY: "mountain_tee_white_m_jpy",
        },
      },
      {
        label: "L",
        stock: 2,
        lookupKeys: {
          USD: "mountain_tee_white_l_usd",
          JPY: "mountain_tee_white_l_jpy",
        },
      },
      {
        label: "XL",
        stock: 2,
        lookupKeys: {
          USD: "mountain_tee_white_xl_usd",
          JPY: "mountain_tee_white_xl_jpy",
        },
      },
    ],
  },
  {
    id: "mountain-tee-black",
    name: {
      en: "TGBEAM x Leeann Huang Mountain Tee - Black",
      jp: "TGBEAM x Leeann Huang マウンテンTシャツ - ブラック",
    },
    description: MERCH_DESCRIPTION,
    prices: {
      USD: { amount: 45, currency: "USD" },
      JPY: { amount: 6000, currency: "JPY" },
    },
    image: "/images/shop/japan-shirt-black.svg",
    hasSizes: true,
    sizes: [
      {
        label: "S",
        stock: 0,
        lookupKeys: {
          USD: "mountain_tee_black_s_usd",
          JPY: "mountain_tee_black_s_jpy",
        },
      },
      {
        label: "M",
        stock: 3,
        lookupKeys: {
          USD: "mountain_tee_black_m_usd",
          JPY: "mountain_tee_black_m_jpy",
        },
      },
      {
        label: "L",
        stock: 3,
        lookupKeys: {
          USD: "mountain_tee_black_l_usd",
          JPY: "mountain_tee_black_l_jpy",
        },
      },
      {
        label: "XL",
        stock: 2,
        lookupKeys: {
          USD: "mountain_tee_black_xl_usd",
          JPY: "mountain_tee_black_xl_jpy",
        },
      },
    ],
  },
  {
    id: "tote-bag",
    name: {
      en: "TGBEAM Tote Bag",
      jp: "TGBEAM トートバッグ",
    },
    description: MERCH_DESCRIPTION,
    prices: {
      USD: { amount: 35, currency: "USD" },
      JPY: { amount: 5000, currency: "JPY" },
    },
    image: "/images/shop/japan-tote.svg",
    hasSizes: false,
    sizes: [],
    stock: 24,
    lookupKeys: {
      USD: "tote_bag_usd",
      JPY: "tote_bag_jpy",
    },
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

/** Currency-specific Stripe lookup key for a product (and size, if applicable). */
export function getLookupKey(
  productId: string,
  selectedSize: string | null,
  currency: Currency
): string | null {
  const product = getProduct(productId);
  if (!product) return null;
  if (product.hasSizes) {
    return (
      product.sizes.find((s) => s.label === selectedSize)?.lookupKeys[currency] ??
      null
    );
  }
  return product.lookupKeys?.[currency] ?? null;
}

/** Unit price amount for a product in the given currency. */
export function getPrice(product: Product, currency: Currency): number {
  return product.prices[currency].amount;
}

/** True if the product has no purchasable stock across all sizes. */
export function isProductSoldOut(product: Product): boolean {
  if (product.hasSizes) {
    return product.sizes.every((s) => s.stock <= 0);
  }
  return (product.stock ?? 0) <= 0;
}

/** Formats a price for display: formatPrice(45,"USD") -> "$45", formatPrice(6000,"JPY") -> "¥6,000". */
export function formatPrice(amount: number, currency: Currency): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return currency === "USD"
      ? `$${amount.toLocaleString()}`
      : `¥${amount.toLocaleString()}`;
  }
}
