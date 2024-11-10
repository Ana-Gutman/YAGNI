import { Request, Response } from "express";
import * as localService from "../services/localService";

// Obtener todos los locales
export const getLocales = async (req: Request, res: Response) => {
    try{
        const locales = await localService.findAllLocales();
        res.status(200).json(locales);
    } catch (error) {
        res
        .status(400)
        .json({
            message: "Error al obtener los locales"
        //error: getErrorMessage(error),
      });
    }
};

// Obtener un local por su id
export const getLocalById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const local = await localService.findLocalById(id);
        if (local) {
            res.status(200).json(local);
        } else {
            res.status(404).json({ message: "Local no encontrado" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al obtener el local",
            //error: getErrorMessage(error),
        });
    }
};

// Crear un local
export const createLocal = async (req: Request, res: Response) => {
    try {
        const local = req.body;
        const localCreado = await localService.createLocal(local);
        res.status(201).json(localCreado);
    } catch (error) {
        res.status(400).json({
            message: "Error al crear el local",
            //error: getErrorMessage(error),
        });
    }
};

// Actualizar un local
export const updateLocal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const local = req.body;
        const localActualizado = await localService.updateLocal(parseInt(id), local);
        
        if (localActualizado[0] === 1) {
            res.status(200).json({ message: "Local actualizado" });
        } else {
            res.status(404).json({ message: "Local no encontrado" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar el local",
            //error: getErrorMessage(error),
        });
    }
};

// Eliminar un local
export const deleteLocal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const localEliminado = await localService.deleteLocal(parseInt(id));
        if (localEliminado) {
            res.status(200).json({ message: "Local eliminado" });
        } else {
            res.status(404).json({ message: "Local no encontrado" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al eliminar el local",
            //error: getErrorMessage(error),
        });
    }
};

