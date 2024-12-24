import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import customConstants from "./utilities/customConstants.js";
import entityRouter from "./routes/entityRoute.js";
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

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});
