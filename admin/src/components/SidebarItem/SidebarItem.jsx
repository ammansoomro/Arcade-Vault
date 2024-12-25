import React from "react";
import "./SidebarItem.css";
const SidebarItem = ({ icon, label }) => {
  return (
    <div className="sidebar-item">
      <img src={icon} alt={label} />
      <p>{label}</p>
    </div>
  );
};

export default SidebarItem;
