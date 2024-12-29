import React, { useContext, useState } from "react";
import "./placeOrder.css";
import { storeContext } from "../../context/StoreContext";
import customConstants from "../../utilities/customConstants";
import axios from 'axios';
const placeOrder = () => {
  const { token, cartItems, item_list, getTotalAmount } =
    useContext(storeContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      // Prepare order items
      const orderItems = getOrderItems();

      // Construct order data
      const orderData = {
        address: data,
        items: orderItems,
        amount: calculateTotalAmount(),
      };

      // Send order request
      const response = await sendOrderRequest(orderData);

      // Handle response
      handleOrderResponse(response);
    } catch (error) {
      // alert("Failed to place the order. Please try again.");
    }
  };

  const getOrderItems = () => {
    return item_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));
  };

  const calculateTotalAmount = () => getTotalAmount() + 2;

  const sendOrderRequest = async (orderData) => {
    return await axios.post(customConstants.API_PLACE_ORDER, orderData, {
      headers: { token },
    });
  };

  const handleOrderResponse = (response) => {
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      throw new Error("Order submission failed.");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={onChangeHandler}
            value={data.firstName}
          />
          <input
            required
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={onChangeHandler}
            value={data.lastName}
          />
        </div>
        <input
          required
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={onChangeHandler}
          value={data.email}
        />
        <input
          required
          name="street"
          type="text"
          placeholder="Street"
          onChange={onChangeHandler}
          value={data.street}
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            type="text"
            placeholder="City"
            onChange={onChangeHandler}
            value={data.city}
          />
          <input
            required
            name="state"
            type="text"
            placeholder="State"
            onChange={onChangeHandler}
            value={data.state}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            type="text"
            placeholder="Zip Code"
            onChange={onChangeHandler}
            value={data.zipcode}
          />
          <input
            required
            name="country"
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
            value={data.country}
          />
        </div>
        <input
          required
          name="phone"
          type="text"
          placeholder="Phone Number"
          onChange={onChangeHandler}
          value={data.phone}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <p>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</p>
          </div>
          <button type="submit" className="checkout-button">
            Pay Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default placeOrder;
