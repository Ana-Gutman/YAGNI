import { Router } from "express"; 
import * as pedidoController from "../controllers/pedidoController";

const router = Router();
router.get("/pedidos", pedidoController.getPedidos);
router.get("/pedidos/:id", pedidoController.getPedidoById);
router.post("/pedidos", pedidoController.createPedido);
router.get('/pedidosCliente', pedidoController.listPedidosCliente);
router.put("/pedidos/:id", pedidoController.updatePedido);
router.get('/clientes/:idCliente/pedidos-refrigeradores', pedidoController.getPedidosConRefrigeradores);
router.post("/pedidos/marcar-incompleto", pedidoController.marcarPedidoIncompleto);


export default router;
