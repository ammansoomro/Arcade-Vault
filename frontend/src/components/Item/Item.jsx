import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./Item.css";

const Item = ({ id, name, price, desc, image }) => {
  const [itemCount, setItemCount] = useState(0);

  const incrementCount = () => setItemCount((prev) => prev + 1);
  const decrementCount = () => setItemCount((prev) => Math.max(prev - 1, 0));

  return (
    <div className="item">
      <div className="item-image-container">
        <img className="item-image" src={image} alt={name} />
        {!itemCount ? (
          <img
            className="add"
            onClick={incrementCount}
            src={assets.add_icon}
            alt="Add Item"
          />
        ) : (
          <div className="item-counter">
            <img
              src={assets.minus}
              onClick={decrementCount}
              alt="Decrease Quantity"
            />
            <p>{itemCount}</p>
            <img
              src={assets.plus}
              onClick={incrementCount}
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
