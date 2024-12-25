import express from "express";
import {
  addEntity,
  listEntities,
  removeEntity,
  getByCategory,
} from "../controllers/entityController.js";
import { upload } from "../middleware/multerImage.js";
const entityRouter = express.Router();

entityRouter.post("/add", upload.single("image"), addEntity);
entityRouter.get("/list", listEntities);
entityRouter.post("/remove", removeEntity);
entityRouter.get("/category/:category", getByCategory);

export default entityRouter;
