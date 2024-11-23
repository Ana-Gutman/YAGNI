import { NextFunction, Request, Response } from "express";
import * as refrigeradorService from "../services/refrigeradorService";
import * as pedidoService from "../../pedidosProductos/services/pedidoService";


export const getRefrigeradores = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refrigeradores = await refrigeradorService.getAllRefrigeradores();
        res.status(200).json(refrigeradores);
    } catch (error) {
        next(error);
    }
};

export const emitirAlarma = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idRefrigerador } = req.params; // ID del refrigerador
        const { id_producto, cantidad_cambiada } = req.body; // Detalles del producto retirado
        const resultado = await refrigeradorService.emitirAlarma(idRefrigerador, id_producto, cantidad_cambiada);
        res.status(200).json({ message: resultado });
    } catch (error) {
        next(error);
    }
};

export const getProductosEnRefrigerador = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idRefrigerador } = req.params;
        const productos = await refrigeradorService.getProductosEnRefrigerador(idRefrigerador);
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
};


export const verificarCantidadRetirada = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { idCliente, idProducto, cantidadRetirada } = req.body;

        // Obtener los pedidos del cliente
        const pedidos = await pedidoService.getPedidosConRefrigeradores(idCliente);

        // Calcular la cantidad total permitida para ese producto en los pedidos
        const totalPermitido = pedidos.reduce((total, pedido) => {
            const producto = pedido.productos.find((p: any) => p.id_producto === idProducto);
            return total + (producto ? producto.cantidad : 0);
        }, 0);

        // Verificar si excede el límite
        if (cantidadRetirada > totalPermitido) {
            // Emitir alarma si la cantidad excede
            await refrigeradorService.emitirAlarma(req.params.idRefrigerador, idProducto, cantidadRetirada);
            return res.status(400).json({ message: "Cantidad excedida. Activando alarma." });
        }

        res.status(200).json({ message: "Cantidad dentro del límite permitido." });
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

export const generarOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idRefrigerador = req.params.idRefrigerador;
        const otp = await refrigeradorService.generarOTP(idRefrigerador);
        res.status(200).json({ otp });
    } catch (error) {
        next(error);
    }
};

export const validarIngresoStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idRefrigerador = req.params.idRefrigerador;
        const { otp, productos } = req.body; 
        const resultado = await refrigeradorService.validarIngresoStock(idRefrigerador, otp, productos);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const obtenerRefrigeradoresPorPedido = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idLocal = parseInt(req.params.idLocal);
        const idPedido = parseInt(req.params.idPedido);

        if (isNaN(idLocal) || isNaN(idPedido)) {
            return res.status(400).json({ error: "Los IDs deben ser números válidos" });
        }

        const refrigeradores = await refrigeradorService.getRefrigeradoresPorPedido(idLocal, idPedido);
        res.status(200).json(refrigeradores);
    } catch (error) {
        next(error);
    }
};

export const obtenerRefrigeradoresPorLocal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idLocal } = req.params;
        const refrigeradores = await refrigeradorService.obtenerRefrigeradoresPorLocal(parseInt(idLocal));
        res.status(200).json(refrigeradores);
      } catch (error) {
        next(error);
      }
};


export const modificarInventario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idRefrigerador = req.params.idRefrigerador;
        const { productos, operacion } = req.body; 

        await refrigeradorService.modificarInventario(idRefrigerador, productos, operacion);
        res.status(200).json({ message: `Stock ${operacion}do exitosamente` });
    } catch (error) {
        next(error);
    }
};



  export const validarOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idRefrigerador = req.params.idRefrigerador;
        const { otp } = req.body;

        const isValid = await refrigeradorService.validarOTP(idRefrigerador, otp);
        if (isValid) {
            res.status(200).json({ message: 'OTP válido' });
        } else {
            res.status(400).json({ message: 'OTP inválido o expirado' });
        }
    } catch (error) {
        next(error);
    }
};

export async function listarExistenciasPorProducto(req: Request, res: Response, next: NextFunction) {
    const { idProducto, fechaInicio, fechaFin } = req.body;
    try {
        const existencias = await refrigeradorService.listarExistenciasPorProducto(idProducto, fechaInicio, fechaFin);
        res.status(200).json(existencias);
    } catch (error) {
        next(error);
   
    }
  }

