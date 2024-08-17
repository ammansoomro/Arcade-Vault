import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="logo-container">
            <img src={assets.logo} alt="" />
            <h2>Arcade Vault</h2>
          </div>

          <p>
            Discover the ultimate gaming experience at Arcade Vault. Shop the
            latest games, consoles, and accessories. Elevate your play with
            top-notch products and unbeatable deals. Your gaming journey starts
            here!
          </p>
          <div className="footer-social-icons">
            <a href="https://www.github.com" target="_blank" rel="noreferrer">
              <img src={assets.github_icon} alt="Github" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <img src={assets.linkedin_icon} alt="Instagram" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+92-331-8308867</li>
            <li>amman.soomro.as@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; 2024 <span>Arcade Vault</span> All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
