"use client";

import AdminProductDetail from "@/components/admin/product/AdminProductDetail ";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Products {
  _id: string;
  title: string;
  description: string;
  price: number;
  photoLink: string;
  category: string;
  quantity: number;
}
export default function ProductPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Products>();
  const params = useParams();
  const { productId } = params;

  //fetched data
  const fetchedProduct = async () => {
    try {
      setLoading(true);
      if (!productId) {
        console.log("productId not specified");
        return;
      }
      const response = await axios.get(
        `/api/product/single-product/${productId}`
      );
      if (!response) {
        console.log("Failed to fetch products");
        return;
      }
      console.log(response.data);
      setProduct(response.data.response);
    } catch (error) {
      console.log(error);
      console.log("error fetching products");
    } finally {
      setLoading(false);
    }
  };
  //handle on delete
  const handleDelete = async () => {
    try {
      setLoading(false);
      if (!productId) {
        console.log("productId not specified");
        return;
      }
      const response = await axios.delete(
        `/api/product/delete-product/${productId}`
      );
      if (!response) {
        console.log("error in deleting");
      }
    } catch (error) {
      console.log("Error deleting category", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchedProduct();
  }, []);

  //if loading 
  if (loading) {
    return <div className="text-black">Loading...</div>;
  }
  return (
    <>
      {!product && (
        <>
          <h1 className="text-black">
            something went Wrong <br /> please recheck the url
          </h1>
        </>
      )}
      {product && (
        <AdminProductDetail
          id={product._id}
          title={product.title}
          description={product.description}
          price={product.price}
          category={product.category}
          image={product.photoLink}
          quantity={product.quantity}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}