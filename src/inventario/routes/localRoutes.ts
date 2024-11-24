import { Router } from "express";
import * as localController from "../controllers/localController";
import authorize from "../../shared/middleware/authMiddleware";
import accessLogger from "../../shared/middleware/accessLogMiddleware";

const router = Router();
router.get("/locales", accessLogger,localController.getLocales);
router.get("/locales/:id", accessLogger,localController.getLocalById);
router.post("/locales", authorize(["Admin"]), accessLogger,localController.createLocal);
router.put("/locales/:id",authorize(["Admin"]), accessLogger, localController.updateLocal);
router.delete("/locales/:id", authorize(["Admin"]), accessLogger, localController.deleteLocal);


export default router;