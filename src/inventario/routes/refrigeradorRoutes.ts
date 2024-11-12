import { Router } from "express";
import * as refrigeradorController from "../controllers/refrigeradorController";

const router = Router();
router.get("/refrigeradores", refrigeradorController.getRefrigeradores);
router.get("/refrigeradores/:id", refrigeradorController.getRefrigeradorById);
router.post("/refrigeradores", refrigeradorController.createRefrigerador);
router.delete("/refrigeradores/:id", refrigeradorController.deleteRefrigerador);
router.put("/refrigeradores/agregar-producto", refrigeradorController.putProductoInRefrigerador);
router.put("/refrigeradores/quitar-producto", refrigeradorController.takeProductoFromRefrigerador);


export default router;