import { Router } from "express"; 
import * as pedidoController from "../controllers/pedidoController";

const router = Router();
router.get("/pedidos", pedidoController.getPedidos);
router.get("/pedidos/:id", pedidoController.getPedidoById);
router.post("/pedidos", pedidoController.createPedido);
router.get('/pedidosCliente', pedidoController.listPedidosCliente);


export default router;
