// OrderSummary.tsx
import React from "react";
interface CartItem {
    _id: string;
    title: string;
    category: string;
    image: string[];
    size: string;
    price: number;
  }
interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  taxes: number;
  total: number;
}

export default function OrderSummary({ cartItems, subtotal, taxes, total }:OrderSummaryProps)  {
  return (
    <div className="bg-zinc-900 p-8 mt-8 rounded-lg shadow-lg w-full max-w-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Order Summary</h2>
      <div>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between mb-4">
            <p>{item.title}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between">
          <p>Subtotal:</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Taxes:</p>
          <p>${taxes.toFixed(2)}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>Total:</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

