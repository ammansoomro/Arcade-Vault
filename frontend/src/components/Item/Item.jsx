import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Item.css";
import { storeContext } from "../../context/StoreContext";

const Item = ({ id, name, price, desc, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(storeContext);

  return (
    <div className="item">
      <div className="item-image-container">
        <img className="item-image" src={image} alt={name} />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon}
            alt="Add Item"
          />
        ) : (
          <div className="item-counter">
            <img
              src={assets.minus}
              onClick={() => removeFromCart(id)}
              alt="Decrease Quantity"
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.plus}
              onClick={() => addToCart(id)}
              alt="Increase Quantity"
            />
          </div>
        )}
      </div>
      <div className="item-info">
        <div className="item-name">
          <p>{name}</p>
        </div>
        <p className="item-desc">{desc}</p>
        <p className="item-price">${price}</p>
      </div>
    </div>
  );
};

export default Item;
