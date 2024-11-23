import { NextFunction, Request, Response } from "express";
import * as pedidoService from "../services/pedidoService";
import { ListaPedidosDeClienteDto } from "../dto/ListaPedidoDto";

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

export const listarPedidosPorEstado = async (req: Request, res: Response, next: NextFunction) => {
    const { id_cliente, fechaInicio, fechaFin } = req.body;

    if (!id_cliente || !fechaInicio || !fechaFin) {
        return res.status(400).json({
            error: {
                name: "MissingParameterError",
                message: "Los parámetros id_cliente, fechaInicio y fechaFin son requeridos",
                code: "MISSING_PARAMETER",
            },
        });
    }

    try {
        const pedidos = await pedidoService.listarPedidosPorClienteYPeriodo({
            id_cliente,
            fechaInicio,
            fechaFin,
        });

        const pedidosSimplificados = pedidos.map((pedido) => ({
            idPedido: pedido.id_pedido, // Ahora disponible
            estado: pedido.estado, // Ahora disponible
        }));

        res.status(200).json(pedidosSimplificados);
    } catch (error) {
        next(error);
    }
};


export const createPedido = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const PedidoDTO = req.body;
        const pedidoCreado = await pedidoService.createPedido(PedidoDTO);
        res.status(201).json(pedidoCreado);
    } catch (error) {
        next(error);
    }
};


export const marcarPedidoIncompleto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idPedido, productos } = req.body; // ID del pedido y lista de productos
        const resultado = await pedidoService.marcarPedidoIncompleto(idPedido, productos);
        res.status(200).json({ message: resultado });
    } catch (error) {
        next(error);
    }
};


export const completarPedido = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idPedido = parseInt(req.params.idPedido, 10); // Convertir a número

        if (isNaN(idPedido)) {
            return res.status(400).json({ message: 'El ID del pedido debe ser un número válido.' });
        }

        await pedidoService.completarPedido(idPedido);
        res.status(200).json({ message: 'Pedido completado exitosamente.' });
    } catch (error) {
        next(error);
    }
};
export const listPedidosCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_cliente, fechaInicio, fechaFin } = req.body;

        if (!id_cliente || !fechaInicio || !fechaFin) {
            return res.status(400).json({
                error: {
                    name: "MissingParameterError",
                    message: "Los parámetros id_cliente, fechaInicio y fechaFin son requeridos",
                },
            });
        }

        const listaPedidoCli: ListaPedidosDeClienteDto = {
            id_cliente: parseInt(id_cliente, 10),
            fechaInicio: new Date(fechaInicio),
            fechaFin: new Date(fechaFin),
        };

        const pedidos = await pedidoService.listarPedidosPorClienteYPeriodo(listaPedidoCli);

        res.status(200).json(pedidos);
    } catch (error) {
        console.error("Error al listar pedidos:", error);
        next(error);
    }
};


export const updatePedido = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const updatedPedido = await pedidoService.updatePedidoRetirado(parseInt(id), estado);
        res.status(200).json(updatedPedido);
    } catch (error) {
        next(error);
    }
}


export const getPedidosConRefrigeradores = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idCliente } = req.params;
        console.log("idUsuario", idCliente, req.params)
        const pedidos = await pedidoService.getPedidosConRefrigeradores(parseInt(idCliente));
        res.status(200).json(pedidos);
    } catch (error) {
        next(error);
    }
};
