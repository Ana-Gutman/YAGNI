
import { Router } from "express";
import * as clienteController from "../controllers/clienteController";
import authorize from "../../shared/middleware/authMiddleware";

const router = Router();
router.get("/clientes", clienteController.getClientes);
router.get("/clientes/:id", clienteController.getClienteById);
router.post("/clientes", authorize(["Admin"]), clienteController.createCliente);
router.put("/clientes/:id", clienteController.updateCliente);    
router.delete("/clientes/:id", clienteController.deleteCliente);
router.post("/clientes/medioPago", clienteController.addMedioPagoToCliente);

export default router;