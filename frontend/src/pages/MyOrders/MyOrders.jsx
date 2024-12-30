import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { storeContext } from "../../context/StoreContext";
import customConstants from "../../utilities/customConstants";
import { assets } from "../../assets/assets";
const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(storeContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      customConstants.API_GET_ORDERS,
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div>
      <div className="orders-table title">
        <p></p>
        <p>Order Details</p>
        <p>Amount</p>
        <p>Items</p>
        <p>Status</p>
      </div>
      {data.map((order, index) => {
        return (
          <div key={index} className="orders-table">
            <img src={assets.delivery_icon} alt="" />
            <p>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x" + item.quantity;
                } else {
                  return item.name + " x" + item.quantity + ", ";
                }
              })}
            </p>
            <p>${order.amount}.00</p>
            <p>{order.items.length}</p>
            <p>{order.status}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
