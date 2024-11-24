import { Router } from "express"; 
import * as productoController from "../controllers/productoController";
import authorize from "../../shared/middleware/authMiddleware";
import accessLogger from "../../shared/middleware/accessLogMiddleware";

const router = Router();
router.get("/productos",accessLogger, productoController.getProductos);
router.get("/productos/:id", accessLogger,productoController.getProductoById);
router.post("/productos", authorize(["Admin"]), accessLogger, productoController.createProducto);
router.put("/productos/:id", authorize(["Admin"]), accessLogger,productoController.updateProducto);
router.delete("/productos/:id", authorize(["Admin"]), accessLogger, productoController.deleteProducto);

export default router;