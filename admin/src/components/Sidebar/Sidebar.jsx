import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-items">
        <div className="sidebar-item">
          <img src={assets.add_icon} alt="" />
          <p>Add Item</p>
        </div>
        <div className="sidebar-item">
          <img src={assets.list_icon} alt="" />
          <p>All Items</p>
        </div>
        <div className="sidebar-item">
          <img src={assets.order_icon} alt="" />
          <p>All Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
