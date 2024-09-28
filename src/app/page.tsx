"use client";
import FilterItem from "@/components/user/FilterItem";
import ProductCard from "@/components/user/productCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Products {
  _id: string;
  title: string;
  description: string;
  price: number;
  photoLink: string;
  category: string;
  quantity: number;
}

export default function Home() {
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

  // console.log(category); //working fine
  //fetching data on initiallization of page
  useEffect(() => {
    if (!category.length && !radio) fetchAllProducts();
  }, [category.length, radio]);

  // fetching data on filter change
  useEffect(() => {
    if (category.length || radio?.length) fetchFilterProducts();
  }, [category, radio]);

  return (
    <main className="flex w-full pt-4 text-black">
      <div className="w-1/4">
        <FilterItem setCategories={setCategory} setRadioGroup={setRadio} />
      </div>
      <div className=" w-3/4">
        <h1 className="font-bold text-center text-2xl text-black">
          All products
        </h1>
        <p>{radio && `${radio}`}</p>
        <p>{category && `${category}`}</p>
        <hr className="bg-black h-0.5 mt-2" />
        {productArray.length === 0 && (
          <>
            <div className="w-full h-52 flex font-bold text-2xl justify-center items-center">
              There is no product
            </div>
          </>
        )}
        {loading && <div>Loading...</div>}
        <div className="grid grid-cols-3 gap-5 justify-items-center">
          {productArray.length > 0 &&
            productArray.map((product) => (
              <div className="py-2" key={product._id}>
                <ProductCard
                  product={product}
                  category={product.category}
                  description={product.description}
                  image={product.photoLink}
                  id={product._id}
                  price={product.price}
                  title={product.title}
                  quantity={product.quantity}
                />
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}