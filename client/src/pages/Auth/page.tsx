import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { useUser } from "../../constants/constants";
import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import RegForm from "../../components/Auth/RegForm/RegForm";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
export default function Auth() {
  const [cookies] = useCookies(["access_token"]);
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { UserID,setId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccessToken = async () => {
      if (cookies.access_token || UserID) {
        const userIdFromStorage = window.localStorage.getItem("UserID");
        setId(userIdFromStorage ? userIdFromStorage : UserID || "");
        navigate('/');
      } else {
        setShouldRender(true);
      }
    };

    checkAccessToken();
  }, [cookies.access_token, UserID, navigate,setId]);

  const toggleForm = () => {
    setIsLoginForm((prev) => !prev);
  };

  return shouldRender ? (
    <div className={'authContainer'}>
      <div className={'formContainer'}>
        {isLoginForm ? (
          <LoginForm switchForm={toggleForm} />
        ) : (
          <RegForm switchForm={toggleForm} />
        )}
      </div>
    </div>
  ) : null;
}
