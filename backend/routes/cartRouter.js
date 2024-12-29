import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController";
import authMiddleWare from "../middleware/authenticate";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleWare, addToCart);
cartRouter.post("/remove", authMiddleWare, removeFromCart);
cartRouter.get("/get", authMiddleWare, getCart);

export default cartRouter;
