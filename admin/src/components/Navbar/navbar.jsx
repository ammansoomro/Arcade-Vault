import React from "react";
import { useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const menuItems = [{ id: "", label: "Home" }];
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <div className="logo-container">
            <img src={assets.logo} alt="Logo" className="logo" />
            <div className="logo-shadow"></div>
          </div>
        </Link>
        <div className="logo-text">
          <h2>Arcade Vault</h2>
          <h5>Admin Panel</h5>
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
      <div className="navbar-right"></div>
    </div>
  );
};

export default Navbar;
