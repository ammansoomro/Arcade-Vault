import React, { useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [activeMenu, setActiveMenu] = useState("home");

  const menuItems = [
    { id: "", label: "Home" },
    { id: "cart", label: "Cart" },
  ];

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo-container">
          <img src={assets.logo} alt="Logo" className="logo" />
          <div className="logo-shadow"></div>
        </div>
        <div className="logo-text">
          <h2>Arcade Vault</h2>
        </div>
      </div>

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
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
            <div className="dot"></div>
          </Link>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
