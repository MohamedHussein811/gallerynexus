import React, { useState, useEffect } from "react";
import axios from "axios";
import { api, useUserId } from "../../constants/constants";
import OrderSummary from "../../components/Cart/OrderSummary";
import CheckoutForm from "../../components/Cart/CheckoutForm";
import ShoppingCart from "../../components/Cart/ShoppingCart";
import Loading from "../../components/Loading/Loading";
import { useCookies } from "react-cookie";

interface CartItem {
  _id: string;
  title: string;
  category: string;
  image: string[];
  size: string;
  price: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showOrderSummary, setShowOrderSummary] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    country: "",
    city: "",
    state: "",
    region: "",
    zip: "",
    phone: "",
    email: "",
  });
  const { UserId } = useUserId();
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get<CartItem[]>(`${api}/cart/${UserId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (UserId) {
      fetchCart();
    } else {
      setIsLoading(false);
    }
  }, [UserId,cookies.access_token]);

  const handleProceedToCheckout = () => {
    setShowOrderSummary(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateCartItems = (updatedCartItems: CartItem[]) => {
    setCartItems(updatedCartItems);
  };

  if (isLoading) {
    return <Loading />;
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const taxRate = 0.1;
  const taxes = subtotal * taxRate;

  // Calculate total
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3">
      {showOrderSummary ? (
        <>
          <CheckoutForm
            formData={formData}
            handleInputChange={handleInputChange}
            cartItems={cartItems}
          />
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            taxes={taxes}
            total={total}
          />
        </>
      ) : (
        <ShoppingCart
          cartItems={cartItems}
          subtotal={subtotal}
          handleProceedToCheckout={handleProceedToCheckout}
          updateCartItems={updateCartItems}
        />
      )}
    </div>
  );
}
