import { NextFunction, Request, Response } from "express";
import * as localService from "../services/localService";

export const getLocales = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const locales = await localService.getAllLocales();
        res.status(200).json(locales);
    } catch (error) {
        next(error);
    }
};

export const getLocalById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const local = await localService.getLocalById(id);
        res.status(200).json(local);
    } catch (error) {
        next(error);
    }
};

export const createLocal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const local = req.body;
        const localCreado = await localService.createLocal(local);
        res.status(201).json(localCreado);
    } catch (error) {
        next(error);
    }
};


export const updateLocal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const localDto = req.body;
        const localActualizado = await localService.updateLocal(id, localDto);
        res.status(200).json(localActualizado);
    } catch (error) {
        next(error);
    }
};

export const deleteLocal = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await localService.deleteLocal(id);
        res.status(200).json({ message: `Local con ID ${id} eliminado` });
    } catch (error) {
        next(error);
    }
};



