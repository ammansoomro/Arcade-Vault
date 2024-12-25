import React, { useContext } from "react";
import "./Cart.css";
import { storeContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import customConstants from "../../utilities/customConstants";
const Cart = () => {
  const { cartItems, item_list, removeFromCart, getTotalAmount } =
    useContext(storeContext);

  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {item_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div key={index} className="cart-items-title cart-item">
                  <img
                    src={`${customConstants.API_IMAGES}` + item.image}
                    alt="Item"
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <img
                    className="remove-item"
                    onClick={() => removeFromCart(item._id)}
                    src={assets.cross_icon}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
          <button
            className="checkout-button"
            onClick={() => navigate("/placeorder")}
          >
            Checkout
          </button>
        </div>
        <div className="cart-promocode">
          <p>If you have a Promo Code, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
