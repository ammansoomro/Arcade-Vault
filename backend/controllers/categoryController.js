import categoryModel from "../models/categoryModel.js";
import fs from "fs";

// Add Category
const addCategory = async (req, res) => {
  const { name, desc } = req.body;
  const imageName = req.file?.filename;

  if (!name || !desc || !imageName) {
    return res.status(400).json({
      success: false,
      message: "All fields are required, including the image.",
    });
  }

  const category = new categoryModel({
    name,
    desc,
    image: imageName,
  });

  try {
    await category.save();
    return res.status(201).json({
      success: true,
      message: "Category added successfully.",
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while adding category.",
    });
  }
};

const listCategories = async (req, res) => {
  try {
    const entities = await categoryModel.find({});
    return res.status(200).json({
      success: true,
      data: entities,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while getting list.",
    });
  }
};

const removeCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.body.id);
    fs.unlink(`uploads/${category.image}`, () => {});
    await categoryModel.findByIdAndDelete(req.body.id);
    res.status(200).json({
      success: true,
      message: "Category Removed.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while removing category.",
    });
  }
};

export { addCategory, listCategories, removeCategory };
