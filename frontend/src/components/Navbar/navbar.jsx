import React, { useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("home");

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "mobile-app", label: "Mobile-App" },
    { id: "contact-us", label: "Contact Us" },
  ];

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={assets.logo} alt="Logo" className="logo" />
        <div className="logo-shadow"></div>
      </div>
      <ul className="navbar-menu">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={activeMenu === item.id ? "active" : ""}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="Basket" />
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
