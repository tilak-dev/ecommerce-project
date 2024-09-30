import { Products } from '@/types/type';
import React from 'react';
import { RemoveToCartButton } from './CustomBotton';
import { useCategory } from '@/context/CategoryProvide';
type ProductCardProps = {
  product: Products;
};

const CartComponent: React.FC<ProductCardProps> = ({ product }) => {
    const [categoryStore] = useCategory()
  const categoryName = categoryStore.find((cat) => cat._id === product.category)?.categoryName || "not available"
  return (
    <div className="border border-purple-700 rounded-lg shadow-lg py-4 px-6 max-w-sm bg-fuchsia-300">
      <img
        src={product.photoLink}
        alt={product.title}
        className="w-full h-48 object-cover rounded-t-md"
      />
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 text-sm">{product.description.substring(0,75)}</p>
        <p className="text-xl font-bold text-gray-800 mt-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-1">Category: {categoryName}</p>
        <p className="text-sm text-gray-500 mt-1">Quantity: {product.quantity}</p>

        <div className=" flex flex-col items-end">
    
          <div className="">
            <RemoveToCartButton id={product._id}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;