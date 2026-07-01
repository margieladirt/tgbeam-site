"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

/** Clears the cart once when mounted (used on the post-checkout success page). */
export default function ClearCartOnMount() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
