import { Router } from "express"; 
import * as productoController from "../controllers/productoController";

const router = Router();
router.get("/productos", productoController.getProductos);
router.get("/productos/:id", productoController.getProductoById);
router.post("/productos", productoController.createProducto);
router.put("/productos/:id", productoController.updateProducto);
router.delete("/productos/:id", productoController.deleteProducto);

export default router;