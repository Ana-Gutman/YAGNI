import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController";
import authorize from "../../shared/middleware/authMiddleware";
import accessLogger from "../../shared/middleware/accessLogMiddleware";

const router = Router();
router.get("/usuarios", authorize(["Admin"]), accessLogger, usuarioController.getUsuarios);
router.get("/usuarios/:id", authorize(["Admin"]), accessLogger, usuarioController.getUsuarioById);
router.post("/usuarios",accessLogger,usuarioController.createUsuario);
router.put("/usuarios/:id", accessLogger,usuarioController.updateUsuario);
router.delete("/usuarios/:id",accessLogger, usuarioController.deleteUsuario);
router.post("/login",accessLogger, usuarioController.loginUsuario);
router.post("/validateUsuario",accessLogger, usuarioController.validateInputForUsuario);

export default router;

