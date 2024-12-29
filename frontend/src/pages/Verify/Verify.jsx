import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import customConstants from "../../utilities/customConstants";
import { storeContext } from "../../context/StoreContext";
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { token } = useContext(storeContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(
      customConstants.API_VERIFY_ORDER,
      {
        success,
        orderId,
      },
      { headers: { token } }
    );
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
