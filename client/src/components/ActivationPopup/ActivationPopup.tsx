import React, { useState } from "react";
import Axios from "axios";
import { api } from "../../constants/constants";

export default function ActivationPopup({ onClose, userId }: any) {
  const [activationCode, setActivationCode] = useState("");
  const [Activationmessage, setActivationMessage] = useState({
    text: "",
    status: 0,
  });
  const handleActivate = async (e: React.FormEvent, activationCodes: any) => {
    e.preventDefault();

    try {
      const activationCode = parseInt(activationCodes);
      const response = await Axios.post(`${api}/activateUser`, {
        userId,
        activationCode,
      });

      const responseData = response.data || {};

      setActivationMessage({
        text: responseData.message,
        status: response.status,
      });

    } catch (error) {
      console.error("Error during activation:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md text-center text-white">
        <h2 className="text-2xl mb-4">Activate Your Account</h2>
        <p className="mb-4">Enter the activation code received in your email:</p>
        <input
          type="text"
          value={activationCode}
          onChange={(e) => setActivationCode(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded"
        />
        {Activationmessage && (
          <p
            className={`message-result ${
              Activationmessage.status === 200 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {Activationmessage.text}
          </p>
        )}

        {Activationmessage.status !== 200 && (
          <button
            onClick={(e) => handleActivate(e, activationCode)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Activate
          </button>
        )}

        {Activationmessage.status === 200 && (
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
