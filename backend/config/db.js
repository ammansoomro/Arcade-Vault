import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`;

export const connectDB = async () => {
  await mongoose.connect(MONGO_URI).then(() => {
    console.log("Arcade Vault Connected to Database.");
  });
};
