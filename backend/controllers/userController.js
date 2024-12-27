import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import {createToken} from "../utilities/utils.js";
const loginUser = async (req, res) => {};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User with the provided email already exists.",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    // Validate password length
    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a token
    const token = createToken(newUser._id);

    // Respond with success
    return res.status(201).json({
      success: true,
      token,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error("Error registering user:", error);

    // Handle server errors
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the user.",
    });
  }
};

export { loginUser, registerUser };
