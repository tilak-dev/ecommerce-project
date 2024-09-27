"use client";


import { useCart } from "@/context/CartProvider";
import { Products } from "@/types/type";

export const AddToCartButton = ({ item }: { item: Products }) => {
  const [cart, setCart] = useCart();
  localStorage.setItem("cart", JSON.stringify(cart));
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === item._id);
    if (itemInCart) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300"
      onClick={addToCart}
    >
      Add to Cart
    </button>
  );
};
export const RemoveToCartButton = ({ id }: { id: string }) => {
  const [cart, setCart] = useCart();

  const removeToCart = () => {
    const itemInCart = cart.find((item) => item._id === id);
    if (!itemInCart) {
      console.log("cart not found or already removed");
    }

    if (itemInCart) {
      setCart(cart.filter((item) => item._id !== id));
      localStorage.setItem(
        "cart",
        JSON.stringify(cart.filter((item) => item._id !== id))
      );
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300"
      onClick={removeToCart}
    >
      Remove
    </button>
  );
};