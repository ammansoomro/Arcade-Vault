import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import ItemDisplay from "../../components/ItemsDisplay/ItemDisplay";
const Home = () => {
  const [category, setCategory] = useState("Games");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <ItemDisplay category={category} />
    </div>
  );
};

export default Home;
