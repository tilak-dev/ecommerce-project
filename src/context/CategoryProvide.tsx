"use client";

import { toast } from "@/hooks/use-toast";
import { Catecories } from "@/types/type";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type CategoryContextType = [
  Catecories[],
  Dispatch<SetStateAction<Catecories[]>>
];

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

type CategoryProviderProps = {
  children: ReactNode;
};

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categoryStore, setCategoryStore] = useState<Catecories[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/category/all-category");
      if (!response) {
        console.log("No category");
        toast({
          title: "No Categories",
          description: "No categories found",
          duration: 3000,
          variant: "destructive",
        });
        return;
      }
      setCategoryStore(response.data.data);
    } catch (error) {
      console.log("Error fetching categories", error);
      toast({
        title: "Error fetching Categories",
        description: "Failed to fetch categories",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories?.length]);
  return (
    <CategoryContext.Provider value={[categoryStore, setCategoryStore]}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
