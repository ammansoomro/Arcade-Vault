import React from "react";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/cart";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import PlaceOrder from "./pages/PlaceOrder/placeOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
