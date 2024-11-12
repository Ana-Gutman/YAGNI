import { Router } from 'express';

import {getProductState} from "../controllers/InventarioController";

const router = Router();

router.get('/inventario/:productId/estado', getProductState);

export default router;
