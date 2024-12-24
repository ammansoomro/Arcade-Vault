import express from "express";
import { addEntity, listEntities } from "../controllers/entityController.js";
import { upload } from "../utilities/utils.js";
const entityRouter = express.Router();

entityRouter.post("/add", upload.single("image"), addEntity);
entityRouter.get("/list", listEntities);

export default entityRouter;
