
import { Router } from "express";
import * as clienteController from "../controllers/clienteController";

const router = Router();
router.get("/clientes", clienteController.getClientes);
router.get("/clientes/:id", clienteController.getClienteById);
router.post("/clientes", clienteController.createCliente);
router.put("/clientes/:id", clienteController.updateCliente);    
router.delete("/clientes/:id", clienteController.deleteCliente);

export default router;