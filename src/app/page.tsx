"use client";
import FilterItem from "@/components/user/FilterItem";
import ProductCard from "@/components/user/productCard";
import { useCategory } from "@/context/CategoryProvide";
import { useFilterProduct } from "@/context/FilterProvider";
import React from "react";

export default function Home() {
  const [categoryStore] = useCategory();
  const [productArray, setProductArray,category, setCategory,radio, setRadio,loading, setLoading] =
    useFilterProduct();

  return (
    <main className="flex w-full pt-4 text-black">
      <div className="w-1/4">
        <FilterItem catList={categoryStore} />
      </div>
      <div className=" w-3/4">
        <h1 className="font-bold text-center text-2xl text-black">
          All products
        </h1>
        <hr className="bg-black h-0.5 mt-2" />
        {!loading && productArray.length < 1 && (
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
