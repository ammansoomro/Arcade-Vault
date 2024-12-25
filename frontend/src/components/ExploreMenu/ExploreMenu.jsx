import React, { useEffect, useState } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import customConstants from "../../utilities/customConstants";
import axios from "axios";

const ExploreMenu = ({ category, setCategory }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(customConstants.API_LIST_CATEGORIES);
    if (response.data.success) {
      return response.data.data;
    } else {
      toast.error("Error Fetching Data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchList();
      if (data) {
        setList(data);
      }
    };
    fetchData();
  }, []);

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
        {list.map((item, index) => (
          <div
            onClick={() => handleCategoryClick(item.name)}
            key={index}
            className={`explore-menu-item ${
              category === item.name ? "active" : ""
            }`}
          >
            <img
              src={`${customConstants.API_IMAGES}` + item.image}
              alt={item.image}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
