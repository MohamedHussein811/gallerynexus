import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./not-found";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/page";
import AddArtworkForm from "./pages/AddArtworkForm/page";
import ArtPage from "./pages/Art/[id]/page";
import Artworks from "./pages/Artworks/[category]/page";
import AuctionDetails from "./pages/AuctionDetails/[id]/page";
import Auctions from "./pages/Auctions/page";
import Cart from "./pages/Cart/page";
import MyOrders from "./pages/MyOrders/page";
import Profile from "./pages/Profile/[username]/page";
import Addauction from "./pages/Addauction/page";
import Admin from "./pages/Admin/Admin";
import { useUser } from "./constants/constants";
import Users from "./pages/Admin/users/users";
import ModifyUser from "./pages/Admin/users/[id]/ModifyUser";
function App() {
  const { isAdmin } = useUser();
  return (
    <main>
      <Routes>
        {isAdmin && (
          <>
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Admin/users" element={<Users/>} />
            <Route path="/Admin/users/:id" element={<ModifyUser />} />
          </>
        )}

        <Route path="/AddArtworkForm" element={<AddArtworkForm />} />
        <Route path="/Addauction" element={<Addauction />} />
        <Route path="/Art/:id" element={<ArtPage />} />
        <Route path="/Artworks/:category" element={<Artworks />} />
        <Route path="/AuctionDetails/:id" element={<AuctionDetails />} />
        <Route path="/Auctions" element={<Auctions />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/Profile/:username" element={<Profile />} />

        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
