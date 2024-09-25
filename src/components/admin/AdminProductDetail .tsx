import React from "react";
import EditProducts from "./product/EditProduct";

interface ProductDetailProps {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  onDelete: () => void;
}

const AdminProductDetail = ({
  id,
  title,
  description,
  price,
  category,
  image,
  stock,
  onDelete,
}: ProductDetailProps) => {
  return (
    <>
      {" "}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Product Image */}
        <div className="flex justify-center mb-6">
          <img
            src={image}
            alt={title}
            className="w-96 h-96 object-cover rounded-lg border border-gray-200"
          />
        </div>

        {/* Product Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-bold">Category:</span> {category}
          </p>
          <p className="text-gray-600 text-base mb-6">{description}</p>
          <div className="text-xl font-semibold text-gray-900 mb-2">
            Price: ₹{price}
          </div>
          <div className="text-lg text-gray-700 mb-6">
            Stock Available: {stock}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 justify-end">
          <EditProducts id="dd" />

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            onClick={() => onDelete()}
          >
            Delete Product
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProductDetail;