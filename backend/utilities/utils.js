import jwt from "jsonwebtoken";

// Function to create a JWT Token Based on User ID
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export { createToken };
