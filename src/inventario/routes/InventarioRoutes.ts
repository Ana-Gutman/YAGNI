import { Router } from 'express';

import {getProductState} from "../controllers/InventarioController";
import authorize from '../../shared/middleware/authMiddleware';
import accessLogger from '../../shared/middleware/accessLogMiddleware';

const router = Router();

router.get('/inventario/:productId/estado', authorize(["Admin", "Supervisor Cocina", "Supervisor Local"]), accessLogger,  getProductState);

export default router;
