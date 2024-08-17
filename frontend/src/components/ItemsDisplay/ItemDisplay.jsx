import React, { useContext } from "react";
import "./ItemDisplay.css";
import { storeContext } from "../../context/StoreContext";
import Item from "../Item/Item";

const ItemDisplay = ({ category }) => {
  const { item_list } = useContext(storeContext);

  const filteredItems = item_list.filter((item) => item.category === category);

  return (
    <div className="item-display" id="item-display">
      <h2>Top Item's Today</h2>
      <div className="item-display-list">
        {filteredItems.map((item, index) => (
          <Item
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            desc={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemDisplay;
