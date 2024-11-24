import { Router } from "express";
import * as cocinaController from "../controllers/cocinaController";
import authorize from "../../shared/middleware/authMiddleware";
import accessLogger from "../../shared/middleware/accessLogMiddleware";

const router = Router();
router.get("/cocinas", authorize(["Admin", "Supervisor Cocina", "Repartidor", "Supervisor Local"]), accessLogger, cocinaController.getCocinas);
router.get("/cocinas/:id", authorize(["Admin", "Supervisor Cocina", "Repartidor", "Supervisor Local"]), accessLogger, cocinaController.getCocinaById);
router.post("/cocinas", authorize(["Admin", "Supervisor Cocina"]), accessLogger, cocinaController.createCocina);
router.put("/cocinas/:id",accessLogger, cocinaController.updateCocina);
router.delete("/cocinas/:id", authorize(["Admin", "Supervisor Cocina"]), accessLogger,cocinaController.deleteCocina);
router.get("/X", authorize(["Admin", "Supervisor Cocina", "Repartidor"]), accessLogger, cocinaController.getX);

export default router;
