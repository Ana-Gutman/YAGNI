import { NextFunction, Request, Response } from "express";
import * as refrigeradorService from "../services/refrigeradorService";

export const getRefrigeradores = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refrigeradores = await refrigeradorService.getAllRefrigeradores();
        res.status(200).json(refrigeradores);
    } catch (error) {
        next(error);
    }
};

export const getRefrigeradorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const refrigerador = await refrigeradorService.getRefrigeradorById(id);
        res.status(200).json(refrigerador);
    } catch (error) {
        next(error);
    }
};

export const createRefrigerador = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refrigerador = req.body;
        const refrigeradorCreado = await refrigeradorService.createRefrigerador(refrigerador);
        res.status(201).json(refrigeradorCreado);
    } catch (error) {
        next(error);
    }
};

export const deleteRefrigerador = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await refrigeradorService.deleteRefrigerador(id);
        res.status(200).json({ message: `Refrigerador con ID ${id} eliminado` });
    } catch (error) {
        next(error);
    }
};

export const putProductoInRefrigerador = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_refrigerador, id_producto, cantidad } = req.body;
        await refrigeradorService.putProductoInRefrigerador(id_refrigerador, id_producto, cantidad);
        res.status(200).json({ message: `Producto con ID ${id_producto} agregado al refrigerador con ID ${id_refrigerador}` });
    } catch (error) {
        next(error);
    }
};

export const takeProductoFromRefrigerador = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_refrigerador, id_producto, cantidad } = req.body;
        await refrigeradorService.takeProductoFromRefrigerador(id_refrigerador, id_producto, cantidad);
        res.status(200).json({ message: `Producto con ID ${id_producto} retirado del refrigerador con ID ${id_refrigerador}` });
    } catch (error) {
        next(error);
    }
};