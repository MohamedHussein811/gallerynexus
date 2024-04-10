import React, { useState } from "react";
import Axios from "axios";
import { api, useUserId } from "../../constants/constants";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  address: string;
  country: string;
  city: string;
  region: string;
  zip: string;
  phone: string;
  email: string;
}

interface CheckoutFormProps {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  cartItems: any;
}

export default function CheckoutForm({
  cartItems,
  formData,
  handleInputChange,
}: CheckoutFormProps) {
  const { UserId } = useUserId();
  const [notification, setNotification] = useState<{
    message: string;
    status: number;
  } | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);

  const placeOrder = async () => {
    try {
      const res = await Axios.post(
        `${api}/placeorder/${UserId}`,
        {
          formData,
          cartItems,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.access_token}`, // Include token in headers
          },
        }
      );
      if (res.status) {
        setNotification({ message: res.data.message, status: res.status });
      }
      if (res.status == 200) {
        setIsButtonDisabled(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder();
  };

  const renderInputField = (
    id: string,
    label: string,
    name: keyof FormData,
    type: string
  ) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-200 font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full px-3 bg-black py-2 rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>
  );

  return (
    <div className="bg-zinc-900 p-8 mt-8 rounded-lg shadow-lg w-full max-w-xl mx-5">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout Form</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        {renderInputField("name", "Name", "name", "text")}
        {renderInputField("address", "Address", "address", "text")}
        {renderInputField("country", "Country", "country", "text")}
        {renderInputField("city", "City", "city", "text")}
        {renderInputField("region", "Region", "region", "text")}
        {renderInputField("zip", "Zip", "zip", "text")}
        {renderInputField("phone", "Phone", "phone", "text")}
        {renderInputField("email", "Email", "email", "email")}
        <button
          type="submit"
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 disabled:bg-red-500"
          disabled={isButtonDisabled}
        >
          Place Order
        </button>
      </form>
      {notification && (
        <p style={{ color: notification.status === 200 ? "green" : "red" }}>
          {notification.message}
        </p>
      )}
    </div>
  );
}
