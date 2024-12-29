import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import customConstants from "./utilities/customConstants.js";
import entityRouter from "./routes/entityRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRouter.js";
dotenv.config();

// App Config
const app = express();
const PORT = process.env.PORT || 4007;

// Middles Wares
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// API END POINTS
app.use(customConstants.API_ENDPOINT + "items", entityRouter);
app.use(customConstants.API_ENDPOINT + "categories", categoryRouter);
app.use(customConstants.API_ENDPOINT + "user", userRouter);
app.use(customConstants.API_ENDPOINT + "cart", cartRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});
