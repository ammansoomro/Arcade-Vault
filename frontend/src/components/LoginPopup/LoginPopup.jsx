import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import customConstants from "../../utilities/customConstants";
import axios from "axios";
import { storeContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleState = () => setIsSignUp((prev) => !prev);
  const { setToken } = useContext(storeContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const url = isSignUp
        ? customConstants.API_REGISTER
        : customConstants.API_LOGIN;

      const response = await axios.post(url, data);

      if (response.data.success) {
        const { token } = response.data;
        setToken(token);
        localStorage.setItem("token", token);
        setShowLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={loginHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {isSignUp && (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{isSignUp ? "Create Account" : "Login"}</button>
        {isSignUp && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>
              By continuing, I acknowledge and agree to the Terms of Service and
              Privacy Policy.
            </p>
          </div>
        )}

        <p onClick={toggleState}>
          {isSignUp ? (
            <>
              Already have an account? <span>Login Here</span>
            </>
          ) : (
            <>
              Create a new account? <span>Click here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
