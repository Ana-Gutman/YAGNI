import { Router } from "express";
import * as refrigeradorController from "../controllers/refrigeradorController";

const router = Router();
router.get("/refrigeradores", refrigeradorController.getRefrigeradores);
router.get("/refrigeradores/:id", refrigeradorController.getRefrigeradorById);
router.post("/refrigeradores", refrigeradorController.createRefrigerador);
router.delete("/refrigeradores/:id", refrigeradorController.deleteRefrigerador);
router.get('/locales/:idLocal/refrigeradores', refrigeradorController.obtenerRefrigeradoresPorLocal);
router.post('/refrigeradores/:idRefrigerador/otp', refrigeradorController.generarOTP);
router.post('/refrigeradores/:idRefrigerador/ingreso', refrigeradorController.validarIngresoStock);
// router.get("/locales/:idLocal/refrigeradores-pedido/:idPedido", refrigeradorController.obtenerRefrigeradoresPorPedido);
router.post('/refrigeradores/:idRefrigerador/validar-otp', refrigeradorController.validarOTP);
router.post('/refrigeradores/:idRefrigerador/stock', refrigeradorController.modificarInventario); 



export default router;