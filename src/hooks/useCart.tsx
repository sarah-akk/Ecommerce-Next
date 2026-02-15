"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem, CartContextValue } from "@/types/types";

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const addToCart = useCallback((item: CartItem) => {
    setItems((prev) => {
      const next = [...prev, item];
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <CartContext.Provider value={{ items, count: items.length, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
