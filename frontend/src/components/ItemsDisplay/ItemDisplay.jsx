import React, { useContext } from "react";
import "./ItemDisplay.css";
import customConstants from "../../utilities/customConstants";
import { storeContext } from "../../context/StoreContext";
import Item from "../Item/Item";

const ItemDisplay = ({ category = "All" }) => {
  const { item_list } = useContext(storeContext);

  const filteredItems = item_list.filter((item) =>
    category === "All" ? true : item.category === category
  );

  return (
    <div className="item-display" id="item-display">
      <h2>{category}</h2>
      <div className="item-display-list">
        {filteredItems.map((item, index) => (
          <Item
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            desc={item.desc}
            image={`${customConstants.API_IMAGES}` + item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemDisplay;
