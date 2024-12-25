import React from "react";
import "./FormWrapper.css";

const FormWrapper = ({ children }) => {
  return <div className="form-wrapper flex-col">{children}</div>;
};

export default FormWrapper;
