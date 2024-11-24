import { Router } from "express"; 
import * as pedidoController from "../controllers/pedidoController";
import authorize from "../../shared/middleware/authMiddleware";
import accessLogger from "../../shared/middleware/accessLogMiddleware";

const router = Router();
router.get("/pedidos" , authorize(["Admin", "Supervisor cocina", "Supervisor local", "Cliente"]), accessLogger,pedidoController.getPedidos);
router.get("/pedidos/:id" , authorize(["Admin", "Supervisor cocina", "Supervisor local", "Cliente"]), accessLogger,pedidoController.getPedidoById);
router.post("/pedidos", authorize(["Admin", "Cliente"]), accessLogger, pedidoController.createPedido);
router.put("/pedidos/:id", authorize(["Admin", "Repartidor"]),accessLogger,pedidoController.updatePedido);
router.get('/clientes/:idCliente/pedidos-refrigeradores', accessLogger,pedidoController.getPedidosConRefrigeradores);  //TODO: Agregar autorización
router.post("/pedidos/marcar-incompleto", authorize(["Admin", "Cliente"]),accessLogger,pedidoController.marcarPedidoIncompleto);
//TODO: DIFERENCIA ENTRE ESTOS DOS??
router.post("/pedidos/listar", authorize(["Admin", "Cliente"]), accessLogger,pedidoController.listPedidosCliente as any); // Para Listado de Pedidos
router.get('/pedidosCliente', authorize(["Admin", "Cliente"]),accessLogger,pedidoController.listPedidosCliente as any);

router.post("/pedidos/estado", authorize(["Admin", "Cliente"]), accessLogger,pedidoController.listarPedidosPorEstado as any); // Para Pedidos por Estado


export default router;
