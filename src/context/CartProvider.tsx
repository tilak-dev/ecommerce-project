"use client";

import { Products } from "@/types/type";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type CartContextType = [Products[], Dispatch<SetStateAction<Products[]>>];

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Products[]>([]);
  useEffect(() => {
    const storedAuth = localStorage.getItem("cart");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      setCart(parsedAuth);
    }
    if (cart.length < 1) {
      localStorage.removeItem("cart");
    }
  }, [cart?.length]);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};