import { NextFunction, Request, Response } from "express";
import * as productoService from "../services/productoService";

export const getProductos = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const productos = await productoService.getAllProductos();
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
};

export const getProductoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const producto = await productoService.getProductoById(id);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
};

export const createProducto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const producto = req.body;
        const productoCreado = await productoService.createProducto(producto);
        res.status(201).json(productoCreado);
    } catch (error) {
        next(error);
    }
};

export const updateProducto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const productoDto = req.body;
        const producto = await productoService.updateProducto(id, productoDto);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
};  

export const deleteProducto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await productoService.deleteProducto(id);
        res.status(200).json({ message: `Producto con ID ${id} eliminado` });
    } catch (error) {
        next(error);
    }
};

// export const getExistenciasPorProducto = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id_producto } = req.params;
//       const { fechaInicio, fechaFin } = req.query;
//       await productoService.getExistenciasPorProducto(id_producto, fechaInicio, fechaFin, res);
//       res.status(200).json({ message: `Existencias del producto con ID ${id_producto}` });
//     } catch (error) {
//         next(error);
//     }
// };
      

