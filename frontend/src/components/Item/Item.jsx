import React from "react";
import "./Item.css";
const Item = ({ id, name, price, desc, image }) => {
  return (
    <div className="item">
      <div className="item-image-container">
        <img className="item-image" src={image} alt={name} />
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
