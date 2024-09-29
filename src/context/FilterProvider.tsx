"use client";
import { Products } from "@/types/type";
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

type FilterProductContextType = [
  Products[],
  Dispatch<SetStateAction<Products[]>>,
  string[],
  Dispatch<SetStateAction<string[]>>,
  number[] | undefined,
  Dispatch<SetStateAction<number[] | undefined>>,
  boolean,

  Dispatch<SetStateAction<boolean>>

];

export const FilterProductContext = createContext<FilterProductContextType | undefined>(
  undefined
);

type FilterProductProviderProps = {
  children: ReactNode;
};

export const FilterProductProvider = ({ children }: FilterProductProviderProps) => {
  const [productArray, setProductArray] = useState<Products[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [radio, setRadio] = useState<number[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  // fetching all products
  const fetchFilterProducts = async () => {
    try {
      setLoading(true);

      if (radio?.length === 0) {
      }
      const response = await axios.post("/api/filter-product", {
        checked: category?.length ? category : undefined,
        radio: radio,
      });
      if (!response) {
        console.log("Failed to fetch products");
        return;
      }
      // console.log(radio);
      // console.log(response.data);
      setProductArray(response.data.data);
    } catch (error) {
      console.log(error);
      console.log("error fetching products");
    } finally {
      setLoading(false);
    }
  };
  // fetching all products
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/product/get-product");
      if (!response) {
        console.log("Failed to fetch products");
        return;
      }
      // console.log(response.data.data);
      setProductArray(response.data.data);
    } catch (error) {
      console.log(error);
      console.log("error fetching products");
    } finally {
      setLoading(false);
    }
  };

  //fetching data on initiallization of page
  useEffect(() => {
    if (!category.length && !radio) fetchAllProducts();
  }, [category.length, radio]);

  // fetching data on filter change
  useEffect(() => {
    if (category.length || radio?.length) fetchFilterProducts();
  }, [category, radio]);

  return (
    <FilterProductContext.Provider value={[productArray, setProductArray,category, setCategory,radio, setRadio,loading, setLoading]}>
      {children}
    </FilterProductContext.Provider>
  );
};

export const useFilterProduct = (): FilterProductContextType => {
  const context = useContext(FilterProductContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
