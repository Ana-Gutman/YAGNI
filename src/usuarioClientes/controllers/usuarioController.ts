import { NextFunction, Request, Response } from "express";
import * as usuarioService from "../services/usuarioService";

export const getUsuarios = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await usuarioService.getAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
};

export const getUsuarioById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = await usuarioService.getUsuarioById(id);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
};

export const createUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = req.body;
        const usuarioCreado = await usuarioService.createUsuario(usuario);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        next(error);
    }
};

export const updateUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const usuarioDto = req.body;
        const usuario = await usuarioService.updateUsuario(id, usuarioDto);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
};

export const deleteUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await usuarioService.deleteUsuario(id);
        res.status(200).json({ message: `Usuario con ID ${id} eliminado` });
    } catch (error) {
        next(error);
    }
};

