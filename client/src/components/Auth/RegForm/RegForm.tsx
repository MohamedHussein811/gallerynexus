import { useState } from "react";
import Axios from "axios";
import "./Reg.css";
import { api } from "../../../constants/constants";
import ActivationPopup from "../../ActivationPopup/ActivationPopup";
import Loading from "../../Loading/Loading"; // Import the Loading component

export default function RegForm({ switchForm }: any) {
  const [username, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", status: 0 });
  const [showActivationPopup, setShowActivationPopup] = useState(false);
  const [userId, setUserId] = useState(null); // State to store user ID
  const [loading, setLoading] = useState(false); // State to track loading

  const createUser = (e: any) => {
    e.preventDefault();
    setLoading(true); // Start loading
    Axios.post(`${api}/createUser`, { username, email, age, password, phone })
      .then((res) => {
        setMessage({
          text: res.data.message,
          status: res.status, // Set the status code
        });
        // Show the activation pop-up on successful registration
        if (res.status === 200) {
          setUserId(res.data.UserID);
          setShowActivationPopup(true);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <form className={'form'}>
      <h1>Register</h1>
      <input
        className={'input'}
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={'input'}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={'input'}
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        className={'input'}
        type="text"
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        className={'input'}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className={'button'} type="submit" onClick={createUser}>
        Sign up
      </button>
      {loading && <Loading />} {/* Show loading component if loading */}
      {message && (
        <p
          className={`p-3 ${
            message.status === 200 ? 'success' : 'error'
          }`}
        >
          {message.text}
        </p>
      )}{" "}
      {/* Display the activation pop-up */}
      {showActivationPopup && <ActivationPopup userId={userId} />}
      {/* Display the message */}
      <p className={'switchText'}>
        Already have an account? <span onClick={switchForm}>Login</span>
      </p>
    </form>
  );
}
