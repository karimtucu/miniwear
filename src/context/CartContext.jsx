// ============================================
// CART CONTEXT — Estado global del carrito
// Envuelve toda la app en App.jsx con <CartProvider>
// ============================================

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  // Cada item: { id, name, emoji, price, size, quantity }

  // Agregar producto (si ya existe el mismo id+talle, suma cantidad)
  const addItem = (product, size) => {
    setItems((prev) => {
      const key = `${product.id}-${size}`;
      const existing = prev.find((i) => i._key === key);
      if (existing) {
        return prev.map((i) =>
          i._key === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          _key: key,
          id: product.id,
          name: product.name,
          emoji: product.emoji,
          price: product.price,
          size,
          quantity: 1,
        },
      ];
    });
  };

  // Cambiar cantidad directamente
  const updateQty = (key, qty) => {
    if (qty < 1) return removeItem(key);
    setItems((prev) => prev.map((i) => (i._key === key ? { ...i, quantity: qty } : i)));
  };

  // Eliminar item
  const removeItem = (key) => {
    setItems((prev) => prev.filter((i) => i._key !== key));
  };

  // Vaciar carrito
  const clearCart = () => setItems([]);

  // Total de unidades (para el badge del navbar)
  const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0);

  // Total en pesos
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clearCart, totalUnits, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar el carrito en cualquier componente
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
