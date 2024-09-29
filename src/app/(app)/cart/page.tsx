"use client";
import CartComponent from "@/components/CartComponent";
import { useCart } from "@/context/CartProvider";
import { toast } from "@/hooks/use-toast";
import { Products } from "@/types/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart] = useCart();
  const [product, setProduct] = useState<Products>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    cart?.map((c) => setProduct(c));
  }, [cart]);

  //  order, customerAddress, totalPrice, payment, productId
  const handleOnBuy = async () => {
    console.log(product);
    try {
      setLoading(true);
      const response = await axios.post("/api/order/create-order", {
        order: "shoes",
        customerAddress: "New Delhi, Delhi-110028, India",
        totalPrice: cart.reduce(
          (acc, cur) => acc + cur.price * cur.quantity,
          0
        ),
        payment: "online payment",
        productId: product?._id,
      });
      if (response.statusText === "OK") {
        toast({
          title: "success",
          description: "Order placed successfully",
        });
        console.log(response);
      } else {
        toast({
          title: "Failed",
          description: "Failed to place order",
        });
        console.log(response);
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Failed to place order",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
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
              Total Price: $
              {cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)}.00
            </div>
            <button
              disabled={loading ? true : false}
              onClick={() => handleOnBuy()}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              {loading ? "Wait..." : "Checkout"}
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
