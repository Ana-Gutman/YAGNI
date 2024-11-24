import { Router } from "express";
import * as camionetaController from "../controllers/camionetaController";
import authorize from "../../shared/middleware/authMiddleware";
import accessLogger from "../../shared/middleware/accessLogMiddleware";

const router = Router();
router.get("/camionetas", authorize(["Admin", "Supervisor Cocina", "Repartidor", "Supervisor Local"]), accessLogger,  camionetaController.getCamionetas);
router.get("/camionetas/:id", authorize(["Admin", "Supervisor Cocina", "Repartidor", "Supervisor Local"]), accessLogger,camionetaController.getCamionetaById);
router.post("/camionetas", authorize(["Admin", "Repartidor"]), accessLogger,camionetaController.createCamioneta);
router.put("/camionetas/:id", authorize(["Admin", "Repartidor"]), accessLogger, camionetaController.updateCamioneta);
router.delete("/camionetas/:id", authorize(["Admin", "Repartidor"]), accessLogger, camionetaController.deleteCamioneta);

export default router;
