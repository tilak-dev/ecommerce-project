"use client";
import CartComponent from "@/components/CartComponent";
import { useCart } from "@/context/CartProvider";
import React from "react";

const CartPage = () => {
  const [cart] = useCart();
  const handleOnBuy = () => {
    console.log("buy");
  };

  return (
    <div className="text-black">
      <h1 className=" text-center font-bold text-3xl py-3">Shopping Cart</h1>
      <div className="flex gap-8">
        <div className="grid grid-cols-3 gap-x-3">
          {cart &&
            cart.map((cart) => (
              <CartComponent
                key={cart._id} 
                product={cart}
                onBuy={handleOnBuy}
              />
            ))}
        </div>
        {cart.length > 0 && (
          <div className="flex justify-center items-center w-1/4 flex-col ">
            <div className="">
              Total Price: ${cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)}.00
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
              Checkout
            </button>
          </div>
        )}

      </div>

      {cart.length < 1 && (
        <h1 className="h-56 flex justify-center items-center">
          {" "}
          your Cart is empty{" "}
        </h1>
      )}
    </div>
  );
};

export default CartPage;