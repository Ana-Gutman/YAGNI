import { NextFunction, Request, Response } from "express";
import * as clienteService from "../services/clienteService";

export const getClientes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientes = await clienteService.getAllClientes();
        res.status(200).json(clientes);
    } catch (error) {
        next(error);
    }
};

export const getClienteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const cliente = await clienteService.getClienteById(id);
        res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
};

export const createCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cliente = req.body;
        const clienteCreado = await clienteService.createCliente(cliente);
        res.status(201).json(clienteCreado);
    } catch (error) {
        next(error);
    }
};

export const updateCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const clienteDto = req.body;
        const cliente = await clienteService.updateCliente(id, clienteDto);
        res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
};

export const deleteCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await clienteService.deleteCliente(id);
        res.status(200).json({ message: `Cliente con ID ${id} eliminado` });
    } catch (error) {
        next(error);
    }
};

export const addMedioPagoToCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idCliente, idMedioPago } = req.body;
        await clienteService.addMedioPagoToCliente(idCliente, idMedioPago);
        res.status(200).json({ message: "Medio de pago agregado al cliente exitosamente" });
    } catch (error) {
        next(error);
    }
};