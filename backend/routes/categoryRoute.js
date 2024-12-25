import express from "express";
import {
  addCategory,
  listCategories,
  removeCategory,
} from "../controllers/categoryController.js";
import { upload } from "../middleware/multerImage.js";
const categoryRouter = express.Router();

categoryRouter.post("/add", upload.single("image"), addCategory);
categoryRouter.get("/list", listCategories);
categoryRouter.post("/remove", removeCategory);

export default categoryRouter;
