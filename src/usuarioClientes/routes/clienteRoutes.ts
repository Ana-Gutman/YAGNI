
import { Router } from "express";
import * as clienteController from "../controllers/clienteController";
import authorize from "../../shared/middleware/authMiddleware";
import accessLogger from "../../shared/middleware/accessLogMiddleware";

const router = Router();
router.get("/clientes",authorize(["Admin"]), accessLogger , clienteController.getClientes);
router.get("/clientes/:id",authorize(["Admin"]), accessLogger , clienteController.getClienteById);
router.get("/mediosPago", accessLogger , clienteController.getMediosPago);
router.post("/clientes", accessLogger ,clienteController.createCliente);
router.put("/clientes/:id", authorize(["Admin", "Cliente"]), accessLogger ,clienteController.updateCliente);    
router.delete("/clientes/:id", authorize(["Admin", "Cliente"]),accessLogger ,clienteController.deleteCliente);
router.post("/clientes/medioPago",authorize(["Admin", "Cliente"]),accessLogger , clienteController.addMedioPagoToCliente);

export default router;