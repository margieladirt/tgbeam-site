"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getAvailableStock,
  getLookupKey,
  type CartItem,
  type Product,
} from "@/app/data/products";

const STORAGE_KEY = "tgbeam-cart";

type AddItemInput = {
  product: Product;
  selectedSize: string | null;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  currency: string;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (input: AddItemInput) => void;
  increaseQuantity: (key: string) => void;
  decreaseQuantity: (key: string) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

function buildKey(productId: string, selectedSize: string | null): string {
  return selectedSize ? `${productId}__${selectedSize}` : productId;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist cart on change (after initial hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota/serialization errors
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    ({ product, selectedSize, quantity }: AddItemInput) => {
      const stock = getAvailableStock(product.id, selectedSize);
      if (stock <= 0) return;

      const lookupKey = getLookupKey(product.id, selectedSize);
      if (!lookupKey) return;

      const key = buildKey(product.id, selectedSize);
      setItems((prev) => {
        const existing = prev.find((item) => item.key === key);
        if (existing) {
          // Never exceed available local stock.
          const nextQty = Math.min(existing.quantity + quantity, stock);
          return prev.map((item) =>
            item.key === key ? { ...item, quantity: nextQty } : item
          );
        }

        const newItem: CartItem = {
          key,
          productId: product.id,
          name: product.name,
          price: product.price,
          currency: product.currency,
          image: product.image,
          selectedSize,
          quantity: Math.min(quantity, stock),
          lookupKey,
        };
        return [...prev, newItem];
      });
    },
    []
  );

  const increaseQuantity = useCallback((key: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.key !== key) return item;
        const stock = getAvailableStock(item.productId, item.selectedSize);
        return { ...item, quantity: Math.min(item.quantity + 1, stock) };
      })
    );
  }, []);

  const decreaseQuantity = useCallback((key: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const currency = items[0]?.currency ?? "JPY";

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    currency,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
