import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import SidebarItem from "../SidebarItem/SidebarItem";
const Sidebar = () => {
  const items = [
    { icon: assets.add_icon, label: "Add Item", toPath: "/addItem" },
    {
      icon: assets.add_category,
      label: "Add Category",
      toPath: "/addCategory",
    },
    { icon: assets.list_icon, label: "View Items", toPath: "/listItems" },
    {
      icon: assets.list_categories,
      label: "View Categories",
      toPath: "/listCategories",
    },
    { icon: assets.order_icon, label: "All Orders", toPath: "/listOrders" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-items">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            toPath={item.toPath}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
