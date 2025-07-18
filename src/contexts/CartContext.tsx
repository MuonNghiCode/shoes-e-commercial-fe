import  { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  images: string[];
  size: string;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setCart((prev) => {
      // Nếu đã có sản phẩm cùng id và size thì tăng số lượng
      const idx = prev.findIndex(
        (ci) => ci.id === item.id && ci.size === item.size
      );
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCart((prev) => prev.filter((ci) => !(ci.id === id && ci.size === size)));
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    setCart((prev) =>
      prev.map((ci) =>
        ci.id === id && ci.size === size ? { ...ci, quantity } : ci
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}; 