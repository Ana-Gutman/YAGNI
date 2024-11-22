import { NextFunction, Request, Response } from "express";
import * as loteService from "../services/loteService";
import {  LoteUpdateRetiroDto } from "../dto/LoteDto";

export const getLotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lotes = await loteService.getAllLotes();
        res.status(200).json(lotes);
    } catch (error) {
        next(error);
    }
};

export const getLoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const lote = await loteService.getLoteById(id);
        res.status(200).json(lote);
    } catch (error) {
        next(error);
    }
};

export const createLote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loteDto = req.body;
        const { lote, productosEnvasados } = await loteService.createLote(loteDto);
        res.status(201).json({ lote, productosEnvasados });
    } catch (error) {
        next(error);
    }
};


export const updateRetiroLote = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const updatedLote = await loteService.updateRetiroLote(parseInt(id));
        res.status(200).json(updatedLote);
    } catch (error) {
        next(error);
    }
};

export const updateEntregaLote = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const updatedLote = await loteService.updateEntregaLote(parseInt(id));
        res.status(200).json(updatedLote);
    } catch (error) {
        next(error);
    }
};

export const deleteLote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await loteService.deleteLote(id);
        res.status(200).json({ message: `Lote con ID ${id} eliminado` });
    } catch (error) {
        next(error);
    }
};
