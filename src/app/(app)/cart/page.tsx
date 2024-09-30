"use client";
import CartComponent from "@/components/CartComponent";
import AddressCard from "@/components/user/AddressCard";
import { useCart } from "@/context/CartProvider";
import { toast } from "@/hooks/use-toast";
import { AddressType, Products } from "@/types/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart] = useCart();
  const [product, setProduct] = useState<Products>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadting, setloading] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<AddressType[]>([]);
  const [customerAddress, setCustomerAddress] = useState<string | null>(null);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`/api/manage-address/get-address`);
      if (!response) {
        console.log("failed to get address")
      }
      // console.log(response.data.data);
      setAddressList(response.data.data);
    } catch (error) {
      
      console.error("Error fetching address", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [addressList.length]);
  useEffect(() => {
    cart?.map((c) => setProduct(c));
  }, [cart]);

  //  order, customerAddress, totalPrice, payment, productId
  const handleOnBuy = async () => {
    console.log(product);
    try {
      setLoading(true);
      const response = await axios.post("/api/order/create-order", {
        order: product?.title.toString(),
        customerAddress: customerAddress,
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
      setCustomerAddress(null)
    }
  };
  const handleOnAdd = async (id: string) => {
    try {
      setloading(true);
      const addedAddress = addressList.find((address) => address._id === id);

      const selectedAddress =
        addedAddress?.city +
        "," +
        addedAddress?.state +
        "-" +
        addedAddress?.zip +
        "," +
        addedAddress?.country;
      if (!selectedAddress) {
        toast({
          title: "Error selecting Address",
          description: "Selected address not found",
          duration: 3000,
          variant: "destructive",
        });
        return;
      }
   
      setCustomerAddress(selectedAddress.toString());
      toast({
        title: "Address selected",
        description: "Selected address successfully",
      });
       if(customerAddress === null){
        toast({
          title: "Failed",
          description: "Please select address",
        });
        return;
      }
    } catch (error: any) {
      toast({
        title: "Error set Address",
        description: error.message,
        duration: 3000,
        variant: "destructive",
      });
      console.log("Error set address", error);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="text-black px-5">
      <h1 className=" text-center font-bold text-3xl py-3">Shopping Cart</h1>
      <div className="flex gap-8">
        <div className="grid grid-cols-3 gap-x-3">
          {cart &&
            cart.map((cart) => <CartComponent key={cart._id} product={cart} />)}
        </div>
        {cart.length > 0 && (
          <div className="flex justify-center w-1/4 flex-col ">
            <div className="w-full ">
              <div className="text-center flex flex-col justify-center items-center">
                <div className="">
                  Total Price: $
                  {cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)}
                  .00
                </div>
                <button
                  disabled={loading ? true : false}
                  onClick={() => handleOnBuy()}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  {loading ? "Wait..." : "Checkout"}
                </button>
              </div>
              <h1 className="text-center">Addresses</h1>
              <div className="w-full flex flex-col justify-center ">
                {addressList &&
                  addressList.map((address) => (
                    <div className="" key={address._id}>
                      <div className="hover:shadow-xl shadow-indigo-700 transition-shadow duration-300 ease-in-out ">
                        <div className="flex justify-between items-center px-3 p-1 border rounded-lg shadow-lg bg-white-500">
                          <div className="py-3 px-2">
                            <h2 className="text-xl font-semibold">
                              {address.city}, {address.state}
                            </h2>

                            <p className="text-gray-600">
                              {address.zip}, {address.country}
                            </p>
                          </div>
                          <button
                            className="bg-green-500 text-white px-4 rounded hover:bg-green-600 transition-colors"
                            onClick={() => handleOnAdd(address._id)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
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
