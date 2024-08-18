import React, { useContext } from "react";
import "./Cart.css";
import { storeContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
const Cart = () => {
  const { cartItems, item_list, removeFromCart } = useContext(storeContext);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
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
              <div>
                <div key={index} className="cart-items-title cart-item">
                  <img src={item.image} alt="Item" />
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
    </div>
  );
};

export default Cart;
