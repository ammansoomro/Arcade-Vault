import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const handleCategoryClick = (menuName) => {
    setCategory((prev) => (prev === menuName ? "All" : menuName));
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Customer's Favourite</h1>
      <p className="explore-menu-text">
        Choose from a diverse collection of games and accessories. Whether
        you're a seasoned gamer or just starting out, we have something for
        everyone. Explore our menu and discover the perfect addition to your
        gaming collection.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            onClick={() => handleCategoryClick(item.menu_name)}
            key={index}
            className={`explore-menu-item ${
              category === item.menu_name ? "active" : ""
            }`}
          >
            <img src={item.menu_image} alt={item.name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
