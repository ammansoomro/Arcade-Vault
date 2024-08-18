import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order Your Favourite Game</h2>
        <p>
          Dive into a world of excitement and adventure. Pre-order your favorite
          game today and be the first to experience thrilling gameplay,
          captivating storylines, and unforgettable moments. Whether you're a
          seasoned gamer or just starting out, this is your chance to bring home
          the action and immerse yourself in the ultimate gaming experience.
          Don't miss out—secure your copy now and get ready for endless fun!
        </p>
        {/* <button className="header-button">View Games</button> */}
      </div>
    </div>
  );
};

export default Header;
