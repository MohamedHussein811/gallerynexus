import { useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import  "./Login.css";
import { api } from "../../../constants/constants";
import ActivationPopup from "../../ActivationPopup/ActivationPopup";
import Loading from "../../Loading/Loading";

export default function LoginForm({ switchForm }: any) {
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [X, setCookies] = useCookies(["access_token"]);
    const [message, setMessage] = useState({ text: "", status: 0 });
    const [showActivationPopup, setShowActivationPopup] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false); 
  
    const LoginUser = async (e: any) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const res = await Axios.post(`${api}/login`, { username, password });
  
        setMessage({
          text: res.data.message,
          status: res.status,
        });
  
        setUserId(res.data.UserID);
  
        if (res.status === 202) {
          setShowActivationPopup(true);
        } else {
          if (res.data.token && res.data.UserID) {
            setCookies("access_token", res.data.token);
            window.localStorage.setItem("UserID", res.data.UserID);
          } else {
            console.error("Invalid response data:", res.data);
          }
        }
      } catch (error) {
        console.error("Error during login:", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <form className={'form'}>
        <h1>Login</h1>
        <input
          className={'input'}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={'input'}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={'button'} type="submit" onClick={LoginUser}>
          Login
        </button>
        {loading && <Loading />}
        {message && (
          <p
            className={`p-3 ${
              message.status === 200 ? 'success' : 'error'
            }`}
          >
            {message.text}
          </p>
        )}{" "}
        {message.status === 202 && showActivationPopup && (
          <ActivationPopup userId={userId} />
        )}
        <p className={'switchText'}>
          Don&apos;t have an account? <span onClick={switchForm}>Register</span>
        </p>
      </form>
    );
  }
