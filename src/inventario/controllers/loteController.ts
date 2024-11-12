import { NextFunction, Request, Response } from "express";
import * as loteService from "../services/loteService";
import { LoteUpdateCantidadDto, LoteUpdateRetiroDto } from "../dto/LoteDto";

const X = 10;

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
        const lote = req.body;
        const loteCreado = await loteService.createLote(lote);
    
        if (loteCreado.cantidad == X) {
            res.status(201).json({
                message: "Lote creado y lleno",
                lote: loteCreado,
            });
        }else{
            res.status(201).json(loteCreado);
        }
    } catch (error) {
        next(error);
    }
};


export const agregarCantidadDeProductoALote = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const loteUpdateCantidadDto: LoteUpdateCantidadDto = req.body;
    try {
        const loteActualizado = await loteService.updateCantidadLote(parseInt(id), loteUpdateCantidadDto);

        if (loteActualizado && loteActualizado.cantidad == X) {
            res.status(200).json({
                message: "Lote actualizado y lleno",
                lote: loteActualizado,
            });
        }else{
            res.status(200).json(loteActualizado);
        }
    } catch (error) {
        next(error);
    }
};

export const updateRetiroLote = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const loteUpdateRetiroDto: LoteUpdateRetiroDto = req.body;

    try {
        const updatedLote = await loteService.updateRetiroLote(parseInt(id), loteUpdateRetiroDto);
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
