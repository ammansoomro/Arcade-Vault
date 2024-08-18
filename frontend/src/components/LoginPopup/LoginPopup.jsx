import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleState = () => setIsSignUp((prev) => !prev);

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {isSignUp && <input type="text" placeholder="Your Name" required />}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>{isSignUp ? "Create Account" : "Login"}</button>
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
