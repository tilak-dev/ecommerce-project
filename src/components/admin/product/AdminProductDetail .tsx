import React from "react";
import EditProducts from "./EditProduct";
import { useCategory } from "@/context/CategoryProvide";

interface ProductDetailProps {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
  onDelete: () => void;
}

const AdminProductDetail = ({
  id,
  title,
  description,
  price,
  category,
  image,
  quantity,
  onDelete,
}: ProductDetailProps) => {
  const [categoryStore] = useCategory()
  const categoryName = categoryStore.find((cat) => cat._id === category)?.categoryName || "not available"
  return (
    <>
      {" "}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg px-4 py-6 flex mt-7">
        {/* Product Image */}
        <div className="flex justify-center mb-6 w-1/3">
          <img
            src={image}
            alt={title}
            className="  rounded-lg border border-gray-200"
          />
        </div>
        <div className=" w-2/3">
          {/* Product Info */}
          <div className="mb-6 ">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-bold">Category:</span> {categoryName}
            </p>
            <p className="text-gray-600 text-sm mb-6">{description}</p>
            <div className=" flex justify-between">
              <div className="flex flex-col">
                {" "}
                <div className="text-xl font-semibold text-gray-900 ">
                  Price: ₹{price}
                </div>
                <div className="text-lg text-gray-700 ">
                  Stock Available: {quantity}
                </div>
              </div>
              <div className="flex space-x-4 flex-row justify-between">
                <EditProducts id="fs" />
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300"
                  onClick={() => onDelete()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
        </div>
      </div>
    </>
  );
};

export default AdminProductDetail;
