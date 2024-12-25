import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import SidebarItem from "../SidebarItem/SidebarItem";
const Sidebar = () => {
  const items = [
    { icon: assets.add_icon, label: "Add Item" },
    { icon: assets.list_icon, label: "View Items" },
    { icon: assets.order_icon, label: "All Orders" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-items">
        {items.map((item, index) => (
          <SidebarItem key={index} icon={item.icon} label={item.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
