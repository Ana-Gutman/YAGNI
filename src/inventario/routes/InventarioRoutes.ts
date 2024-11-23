import { Router } from 'express';

import {getProductState} from "../controllers/InventarioController";

const router = Router();

router.get('/inventario/:productId/estado', getProductState); //no mover

export default router;
