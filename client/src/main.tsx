import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Main/Nav/Nav";
import Footer from "./components/Main/Footer/Footer";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <App />
      <Toaster />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
