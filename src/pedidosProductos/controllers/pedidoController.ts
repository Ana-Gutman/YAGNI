import { NextFunction, Request, Response } from "express";
import * as pedidoService from "../services/pedidoService";

export const getPedidos = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const pedidos = await pedidoService.getAllPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        next(error);
    }
};

export const getPedidoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const pedido = await pedidoService.getPedidoById(id);
        res.status(200).json(pedido);
    } catch (error) {
        next(error);
    }
};

export const createPedido = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pedido = req.body;
        const pedidoCreado = await pedidoService.createPedido(pedido);
        res.status(201).json(pedidoCreado);
    } catch (error) {
        next(error);
    }
};
