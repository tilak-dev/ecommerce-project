"use client";
import React from "react";
import { useRouter } from "next/navigation";
import TextLimit from "@/components/TextLimit";
import EditProducts from "./EditProduct";
import { useCategory } from "@/context/CategoryProvide";

interface ProductCard {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  handleOnDelete: (id: string) => void;
}

const AdminProductCard = ({
  id,
  title,
  description,
  image,
  price,
  category,
  quantity,
  handleOnDelete,
}: ProductCard) => {
  const [categoryStore] = useCategory();
  const categoryName =
    categoryStore.find((c) => c._id === category)?.categoryName || "N/A";
  const router = useRouter();
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-700 ease-in-out  bg-white border border-gray-200 transform  ">
      <img className="w-full h-52 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-1 text-gray-900">{title}</div>
        <p className="text-gray-500 text-sm mb-1 italic">
          Category: {categoryName}
        </p>
        <p
          onClick={() => router.push(`/admin/manage-product/${id}`)}
          className="cursor-pointer text-gray-600 text-sm mb-2.5"
        >
          <TextLimit text={description} limit={75} />
        </p>
        <div className="text-lg font-semibold text-gray-900">₹{price}</div>
        <div className="text-sm text-gray-700 mb-2">In stock: {quantity}</div>
        <div className="flex gap-x-5 justify-center">
          <div className="">
            <EditProducts id={id} />
          </div>
          <button
            onClick={() => handleOnDelete(id)}
            className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
