"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing)
        return prev.map(p =>
          p.id === product.id ? { ...p, qty: p.qty + qty } : p
        );
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = id => setCart(prev => prev.filter(p => p.id !== id));
  const clearCart = () => setCart([]);
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
