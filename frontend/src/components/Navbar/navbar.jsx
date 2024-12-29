import React, { useState, useContext } from "react";
import { storeContext } from "../../context/StoreContext";
import "./navbar.css";
import { assets } from "../../assets/assets";

import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [activeMenu, setActiveMenu] = useState("home");

  const { getTotalAmount, token, setToken } = useContext(storeContext);

  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  const menuItems = [];

  return (
    <div className="navbar">
      <Link className="navbar-left" to="/">
        <div className="logo-container">
          <img src={assets.logo} alt="Logo" className="logo" />
          <div className="logo-shadow"></div>
        </div>
        <div className="logo-text">
          <h2>Arcade Vault</h2>
        </div>
      </Link>

      <ul className="navbar-menu">
        {menuItems.map((item) => (
          <Link
            to={`/${item.id}`}
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={activeMenu === item.id ? "active" : ""}
          >
            {item.label}
          </Link>
        ))}
      </ul>
      <div className="navbar-right">
        {token && (
          <Link to="/orders ">
            <img src={assets.orders_icon} alt="Orders" />
          </Link>
        )}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
            <div className={getTotalAmount() === 0 ? "" : "dot"}></div>
          </Link>
        </div>
        {!token && <button onClick={() => setShowLogin(true)}>Sign In</button>}
        {token && <button onClick={() => logoutUser(true)}>Log Out</button>}
      </div>
    </div>
  );
};

export default Navbar;
