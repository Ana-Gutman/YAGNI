import { Router } from "express";
import * as refrigeradorController from "../controllers/refrigeradorController";
import authorize from "../../shared/middleware/authMiddleware";

const router = Router();
router.get("/refrigeradores", authorize(["Admin", "Supervisor local", "Cliente", "Repartidor", "Dispositivo"]), refrigeradorController.getRefrigeradores);
router.get("/refrigeradores/:id", authorize(["Admin", "Supervisor local", "Cliente", "Repartidor", "Dispositivo"]), refrigeradorController.getRefrigeradorById);
router.post("/refrigeradores", authorize(["Admin", "Supervisor local"]), refrigeradorController.createRefrigerador);
router.delete("/refrigeradores/:id", authorize(["Admin", "Supervisor local"]), refrigeradorController.deleteRefrigerador);
router.get('/locales/:idLocal/refrigeradores', authorize(["Admin", "Supervisor local", "Cliente", "Repartidor", "Dispositivo"]), refrigeradorController.obtenerRefrigeradoresPorLocal);
router.post('/refrigeradores/:idRefrigerador/otp', authorize(["Admin", "Supervisor local", "Cliente", "Repartidor", "Dispositivo"]), refrigeradorController.generarOTP);
router.post('/refrigeradores/:idRefrigerador/validar-otp', authorize(["Admin", "Supervisor local", "Cliente", "Repartidor", "Dispositivo"]), refrigeradorController.validarOTP);
router.post('/refrigeradores/:idRefrigerador/stock', authorize(["Admin", "Supervisor local", "Cliente", "Repartidor", "Dispositivo"]), refrigeradorController.modificarInventario); 
router.post('/refrigeradores/:idRefrigerador/alarma', authorize(["Admin", "Supervisor local", "Cliente", "Repartidor", "Dispositivo"]), refrigeradorController.emitirAlarma);
router.get('/refrigeradores/:idRefrigerador/productos', authorize(["Admin", "Supervisor local", "Cliente", "Repartidor", "Dispositivo"]), refrigeradorController.getProductosEnRefrigerador);
router.post(
    "/refrigeradores/:idRefrigerador/verificar-cantidad", authorize(["Admin", "Supervisor local", "Cliente", "Repartidor", "Dispositivo"]),
    refrigeradorController.verificarCantidadRetirada as any
);
router.post("/refrigeradores/existencias", authorize(["Admin", "Supervisor local", "Cliente", "Repartidor", "Dispositivo"]), refrigeradorController.listarExistenciasPorProducto);


export default router;