import { Router } from "express";
import * as loteController from "../controllers/loteController";
import authorize from "../../shared/middleware/authMiddleware";
import accessLogger from "../../shared/middleware/accessLogMiddleware";

const router = Router();
router.get("/lotes",authorize(["Admin", "Supervisor Cocina", "Repartidor", "Supervisor Local"]),  accessLogger, loteController.getLotes);
router.get("/lotes/:id",authorize(["Admin", "Supervisor Cocina", "Repartidor", "Supervisor Local"]), accessLogger,loteController.getLoteById);
router.post("/lotes", authorize(["Admin", "Supervisor Cocina"]), accessLogger, loteController.createLote);
router.delete("/lotes/:id",  authorize(["Admin", "Supervisor Cocina"]),accessLogger,loteController.deleteLote);
router.put("/lotes/:id", authorize(["Admin", "Repartidor"]), accessLogger,loteController.updateEntregaLote);
router.put("/lotes/retiro/:id", authorize(["Admin", "Repartidor"]),accessLogger, loteController.updateRetiroLote);


export default router;
