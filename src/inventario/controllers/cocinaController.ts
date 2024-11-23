import { NextFunction, Request, Response } from "express";
import * as cocinaService from "../services/cocinaService";
import { startListeningForPedidos } from "../queues/cocinaSubscriber";
import { X } from "../config";

export const getCocinas = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const cocinas = await cocinaService.getAllCocinas();
        res.status(200).json(cocinas);
    } catch (error) {
        next(error);
    }
};

export const getX = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const x = X;
        res.status(200).json(x);
    } catch (error) {
        next(error);
    }
}

export const getCocinaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const cocina = await cocinaService.getCocinaById(id);
        res.status(200).json(cocina);
    } catch (error) {
        next(error);
    }
};

export const createCocina = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cocina = req.body;
        const cocinaCreada = await cocinaService.createCocina(cocina);
        // await startListeningForPedidos(cocinaCreada.id_cocina);
        res.status(201).json(cocinaCreada);
    } catch (error) {
        next(error);
    }
};

export const updateCocina = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const cocinaDto = req.body;
        const cocinaActualizada = await cocinaService.updateCocina(id, cocinaDto);
        res.status(200).json(cocinaActualizada);
    } catch (error) {
        next(error);
    }
};

export const deleteCocina = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await cocinaService.deleteCocina(id);
        res.status(200).json({ message: `Cocina con ID ${id} eliminada` });
    } catch (error) {
        next(error);
    }
};
