import { Router } from "express";
import * as localController from "../controllers/localController";

const router = Router();
router.get("/locales", localController.getLocales);
router.get("/locales/:id", localController.getLocalById);
router.post("/locales", localController.createLocal);
router.put("/locales/:id", localController.updateLocal);
router.delete("/locales/:id", localController.deleteLocal);


export default router;