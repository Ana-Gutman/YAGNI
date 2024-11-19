import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController";

const router = Router();
router.get("/usuarios", usuarioController.getUsuarios);
router.get("/usuarios/:id", usuarioController.getUsuarioById);
router.post("/usuarios", usuarioController.createUsuario);
router.put("/usuarios/:id", usuarioController.updateUsuario);
router.delete("/usuarios/:id", usuarioController.deleteUsuario);
router.post("/login", usuarioController.loginUsuario);

export default router;