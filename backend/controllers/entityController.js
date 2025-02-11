import entityModel from "../models/entityModel.js";
import fs from "fs";

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

const listEntities = async (req, res) => {
  try {
    const entities = await entityModel.find({});
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

const removeEntity = async (req, res) => {
  try {
    const entity = await entityModel.findById(req.body.id);
    fs.unlink(`uploads/${entity.image}`, () => {});
    await entityModel.findByIdAndDelete(req.body.id);
    res.status(200).json({
      success: true,
      message: "Entity Removed.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while removing entity.",
    });
  }
};

const getByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const entities = await entityModel.find({ category });
    if (entities.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No entities found in this category.",
      });
    }
    return res.status(200).json({
      success: true,
      data: entities,
    });
  } catch (error) {
    console.error("Error fetching entities by category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching entities by category.",
    });
  }
};

export { addEntity, listEntities, removeEntity, getByCategory };
