import React from "react";
import "./SidebarItem.css";
import { NavLink } from "react-router-dom";
const SidebarItem = ({ icon, label, toPath }) => {
  return (
    <NavLink to={toPath} className="sidebar-item">
      <img src={icon} alt={label} />
      <p>{label}</p>
    </NavLink>
  );
};

export default SidebarItem;
