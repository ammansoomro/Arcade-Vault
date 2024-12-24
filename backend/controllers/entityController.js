import entityModel from "../models/entityModel.js";
import fs from "fs";

// Add Entity
const addEntity = async (req, res) => {
  const { name, desc, price, category } = req.body;
  const imageName = req.file?.filename;

  if (!name || !desc || !price || !category || !imageName) {
    return res.status(400).json({
      success: false,
      message: "All fields are required, including the image.",
    });
  }

  const entity = new entityModel({
    name,
    desc,
    price,
    category,
    image: imageName,
  });

  try {
    await entity.save();
    return res.status(201).json({
      success: true,
      message: "Entity added successfully.",
    });
  } catch (error) {
    console.error("Error adding entity:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while adding entity.",
    });
  }
};

export { addEntity };
