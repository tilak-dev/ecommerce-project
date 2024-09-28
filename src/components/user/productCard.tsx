import React from "react";
import TextLimit from "../TextLimit";
import { Products } from "@/types/type";
import { AddToCartButton } from "../CustomBotton";
import { useCategory } from "@/context/CategoryProvide";
interface ProductCard {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  product: Products 
}

const ProductCard = ({
  id,
  title,
  description,
  image,
  price,
  category,
  quantity,
  product
}: ProductCard) => {
  const [categoryStore] = useCategory()
  const categoryName = categoryStore.find(c => c._id === category)?.categoryName || "not available" 
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-700 ease-in-out  bg-white border border-gray-200 transform  ">
      <img className="w-full h-52 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-1 text-gray-900">{title}</div>
        <p className="text-gray-500 text-sm mb-1 italic">
          Category: {categoryName}
        </p>
        <p className="cursor-pointer text-gray-600 text-sm mb-2.5">
          
          <TextLimit text={description} limit={75} />
        </p>
        <div className="text-lg font-semibold text-gray-900">₹{price}</div>
        <div className="text-sm text-gray-700 mb-2">In stock: {quantity}</div>
        <div className="flex gap-x-5 justify-center">
          <div className="">
            {/* edit button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
            >Detail</button>
          </div>
          <div className="">
          <AddToCartButton item={product}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;