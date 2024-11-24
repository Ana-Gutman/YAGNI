import { Router } from "express"; 
import * as pedidoController from "../controllers/pedidoController";

const router = Router();
router.get("/pedidos", pedidoController.getPedidos);
router.get("/pedidos/:id", pedidoController.getPedidoById);
router.post("/pedidos", pedidoController.createPedido as any);
router.get('/pedidosCliente', pedidoController.listPedidosCliente as any);
router.put("/pedidos/:id", pedidoController.updatePedido);
router.get('/clientes/:idCliente/pedidos-refrigeradores', pedidoController.getPedidosConRefrigeradores);
router.post("/pedidos/marcar-incompleto", pedidoController.marcarPedidoIncompleto);
router.post("/pedidos/listar", pedidoController.listPedidosCliente as any); // Para Listado de Pedidos
router.post("/pedidos/estado", pedidoController.listarPedidosPorEstado as any); // Para Pedidos por Estado


export default router;
