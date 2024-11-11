import { Router } from "express";
import * as camionetaController from "../controllers/camionetaController";

const router = Router();
router.get("/camionetas", camionetaController.getCamionetas);
router.get("/camionetas/:id", camionetaController.getCamionetaById);
router.post("/camionetas", camionetaController.createCamioneta);
router.put("/camionetas/:id", camionetaController.updateCamioneta);
router.delete("/camionetas/:id", camionetaController.deleteCamioneta);

export default router;
