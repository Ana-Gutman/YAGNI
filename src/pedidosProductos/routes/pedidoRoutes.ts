import { Router } from "express"; 
import * as pedidoController from "../controllers/pedidoController";
import authorize from "../../shared/middleware/authMiddleware";
import accessLogger from "../../shared/middleware/accessLogMiddleware";

const router = Router();

router.get("/pedidos" , authorize(["Admin", "Supervisor cocina", "Supervisor local", "Cliente"]), accessLogger,pedidoController.getPedidos);
router.get("/pedidos/:id" , authorize(["Admin", "Supervisor cocina", "Supervisor local", "Cliente"]), accessLogger,pedidoController.getPedidoById);
router.post("/pedidos", authorize(["Admin", "Cliente"]), accessLogger, pedidoController.createPedido as any);
router.put("/pedidos/:id", authorize(["Admin", "Repartidor"]),accessLogger,pedidoController.updatePedido);
router.get('/clientes/:idCliente/pedidos-refrigeradores', authorize(["Admin", "Cliente"]), accessLogger,pedidoController.getPedidosConRefrigeradores); 
router.post("/pedidos/marcar-incompleto", authorize(["Admin", "Cliente"]),accessLogger,pedidoController.marcarPedidoIncompleto);
router.post("/pedidos/listar", authorize(["Admin", "Cliente"]), accessLogger,pedidoController.listPedidosCliente as any);
router.post("/pedidos/estado", authorize(["Admin", "Cliente"]), accessLogger,pedidoController.listarPedidosPorEstado as any);


export default router;
