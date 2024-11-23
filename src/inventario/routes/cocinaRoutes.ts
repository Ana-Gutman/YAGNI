import { Router } from "express";
import * as cocinaController from "../controllers/cocinaController";

const router = Router();
router.get("/cocinas", cocinaController.getCocinas);
router.get("/cocinas/:id", cocinaController.getCocinaById);
router.post("/cocinas", cocinaController.createCocina);
router.put("/cocinas/:id", cocinaController.updateCocina);
router.delete("/cocinas/:id", cocinaController.deleteCocina);
router.get("/X", cocinaController.getX);

export default router;
