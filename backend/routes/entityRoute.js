import express from "express";
import { addEntity } from "../controllers/entityController.js";
import { upload } from "../utilities/utils.js";
const entityRouter = express.Router();

entityRouter.post("/add", upload.single("image"), addEntity);

export default entityRouter;
