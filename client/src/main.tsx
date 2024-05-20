import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Main/Nav/Nav";
import Footer from "./components/Main/Footer/Footer";
import { Toaster } from "sonner";
import axios from "axios";
import { useCookies } from "react-cookie";
const Root = () => {
  axios.defaults.withCredentials = true;
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    if (cookies.access_token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cookies.access_token}`;
    }
  }, [cookies.access_token]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        {window.location.pathname.includes("/Admin") ? null : (
          <>
            <Nav />
          </>
        )}

        <App />
        <Toaster />
        {window.location.pathname.includes("/Admin") ? null : (
          <>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
