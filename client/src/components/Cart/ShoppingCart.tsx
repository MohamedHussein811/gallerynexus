import React from "react";
import axios from "axios";
import { api, useUserId } from "../../constants/constants";
import { toast } from "sonner";
import Loading from "../Loading/Loading";
import { useCookies } from "react-cookie";

interface ShoppingCartProps {
  cartItems: any[];
  subtotal: number;
  handleProceedToCheckout: () => void;
  updateCartItems: (updatedCartItems: any[]) => void;
}

export default function ShoppingCart({
  cartItems,
  subtotal,
  handleProceedToCheckout,
  updateCartItems,
}: ShoppingCartProps) {
  const { UserId } = useUserId();
  const [cookies] = useCookies(["access_token"]);

  const handleDeleteItem = async (itemId: string) => {
    try {
      const res = await axios.post(
        `${api}/deletefromcart`,
        { itemId, UserId },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      const timestamp = new Date().toLocaleString();
      if (res.status === 200) {
        toast(res.data.message, {
          description: timestamp,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        // Update cart items in Cart component after successful deletion
        const updatedCartItems = cartItems.filter(
          (item) => item._id !== itemId
        );
        updateCartItems(updatedCartItems);
      } else {
        toast(res.data.message, {
          description: timestamp,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg shadow-lg p-8 w-full max-w-xl mx-5">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Your Shopping Cart
      </h2>
      {!cartItems ? (
        <Loading />
      ) : cartItems.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item: any) => (
            <div
              key={item._id}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center">
                <img
                  width={200}
                  height={200}
                  src={item.image[0]}
                  alt={item.title}
                  className="w-24 h-24 mr-6 rounded-md shadow-md"

                />
                <div>
                  <p className="font-semibold text-xl">{item.title}</p>
                  <p className="text-lg text-gray-600">{item.category}</p>
                  <p className="text-sm text-gray-500">Shipping included</p>
                  <p className="text-lg text-gray-600">
                    Artwork total: ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteItem(item._id)}
                className="text-red-600 hover:text-red-800 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
          <div className="mt-8">
            <p className="font-semibold text-2xl text-center">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <button
              onClick={handleProceedToCheckout}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
