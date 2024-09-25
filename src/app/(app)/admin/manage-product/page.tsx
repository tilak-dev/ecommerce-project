"use client";

import AdminProductCard from "@/components/admin/product/AdminProductCart";
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

export default function page() {
  const [productArray, setProductArray] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  //handle on delete
  const handleOnDelete = async (id: string) => {
    try {
      setLoading(false);
      const response = await axios.delete(`/api/product/delete-product/${id}`);
      if (!response) {
        console.log("error in deleting");
      }
      setProductArray(productArray.filter((product) => product._id !== id));
    } catch (error) {
      console.log("Error deleting category", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //fetching data on initiallization of page
  useEffect(() => {
    fetchAllProducts();
  }, []);
  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="text-black">
      <h1 className="font-bold text-center text-2xl">
        Manage your all products
      </h1>
      <hr className="bg-black h-0.5 mt-2" />
      {productArray.length === 0 && (
        <>
          <div className="w-full h-52 flex font-bold text-2xl justify-center items-center">
            There is no product
          </div>
        </>
      )}
      <div className="grid grid-cols-3 gap-5 justify-items-center">
        {productArray.length > 0 &&
          productArray.map((product) => (
            <div className="py-2" key={product._id}>
              <AdminProductCard
                category={product.category}
                description={product.description}
                image={product.photoLink}
                id={product._id}
                price={product.price}
                title={product.title}
                quantity={product.quantity}
                handleOnDelete={handleOnDelete}
              />
            </div>
          ))}
      </div>
    </div>
  );
}