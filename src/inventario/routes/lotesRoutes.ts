import { Router } from "express";
import * as loteController from "../controllers/loteController";

const router = Router();
router.get("/lotes", loteController.getLotes);
router.get("/lotes/:id", loteController.getLoteById);
router.post("/lotes", loteController.createLote);
router.delete("/lotes/:id", loteController.deleteLote);
router.put("/lotes/:id", loteController.updateEntregaLote);
router.put("/lotes/retiro/:id", loteController.updateRetiroLote);


export default router;
