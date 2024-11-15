import { Router } from "express";
import * as refrigeradorController from "../controllers/refrigeradorController";
import { modificarInventarioConOTP } from "../services/refrigeradorService";

const router = Router();
router.get("/refrigeradores", refrigeradorController.getRefrigeradores);
router.get("/refrigeradores/:id", refrigeradorController.getRefrigeradorById);
router.post("/refrigeradores", refrigeradorController.createRefrigerador);
router.delete("/refrigeradores/:id", refrigeradorController.deleteRefrigerador);
router.get('/locales/:idLocal/refrigeradores', refrigeradorController.obtenerRefrigeradoresPorLocal);
router.post('/refrigeradores/:idRefrigerador/otp', refrigeradorController.generarOTP);
router.post('/refrigeradores/:idRefrigerador/ingreso', refrigeradorController.validarIngresoStock);
router.post('/refrigeradores/:idRefrigerador/stock', refrigeradorController.modificarInventarioConOTP);




export default router;