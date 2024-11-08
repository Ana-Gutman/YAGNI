import { Request, Response } from "express";
import * as usuarioService from "../services/usuarioService";

// Obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {
    try{
        const usuarios = await usuarioService.findAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res
        .status(400)
        .json({
            message: "Error al obtener los clientes"
        //error: getErrorMessage(error),
      });
    }
};

// Obtener un usuario por su id
export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = await usuarioService.findUsuarioById(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al obtener el usuario",
            //error: getErrorMessage(error),
        });
    }
};

// Crear un usuario
export const createUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = req.body;
        const usuarioCreado = await usuarioService.createUsuario(usuario);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        res.status(400).json({
            message: "Error al crear el usuario",
            //error: getErrorMessage(error),
        });
    }
};

// Actualizar un usuario 
export const updateUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuario = req.body;
        const usuarioActualizado = await usuarioService.updateUsuario(parseInt(id), usuario);
        
        if (usuarioActualizado[0] === 1) {
            res.status(200).json({ message: "Usuario actualizado" });
        } else {
            res.status(404).json({ message: "usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({message: "Error al actualizar el usuario",
              //error: getErrorMessage(error),
        });
    }
};

// Eliminar un usuario
export const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuarioEliminado = await usuarioService.deleteUsuario(parseInt(id));
        if (usuarioEliminado === 1) {
            res.status(200).json({ message: "Usuario eliminado" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al eliminar el usuario",
            //error: getErrorMessage(error),
        });
    }
};