import { NextFunction, Request, Response } from "express";
import * as camionetaService from "../services/camionetaService";
import { startListeningForLotes } from "../queues/camionetaSubscriber";

export const getCamionetas = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const camionetas = await camionetaService.getAllCamionetas();
        res.status(200).json(camionetas);
    } catch (error) {
        next(error);
    }
};

export const getCamionetaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const camioneta = await camionetaService.getCamionetaById(id);
        res.status(200).json(camioneta);
    } catch (error) {
        next(error);
    }
};

export const createCamioneta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const camioneta = req.body;
        const camionetaCreada = await camionetaService.createCamioneta(camioneta);
        res.status(201).json(camionetaCreada);
    } catch (error) {
        next(error);
    }
};

export const updateCamioneta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const camionetaDto = req.body;
        const camionetaActualizada = await camionetaService.updateCamioneta(id, camionetaDto);
        res.status(200).json(camionetaActualizada);
    } catch (error) {
        next(error);
    }
};

export const deleteCamioneta = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await camionetaService.deleteCamioneta(id);
        res.status(200).json({ message: `Camioneta con ID ${id} eliminada` });
    } catch (error) {
        next(error);
    }
};
