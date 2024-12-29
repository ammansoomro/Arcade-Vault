import express from "express";
import authMiddleWare from "../middleware/authenticate.js";
import { placeOrder, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleWare, placeOrder);
orderRouter.post("/verify", authMiddleWare, verifyOrder);

export default orderRouter;
