import { Request, Response } from "express";
import * as productoService from "../services/productoService";

// Obtener todos los productos
export const getProductos = async (req: Request, res: Response) => {
    try{
        const productos = await productoService.findAllProductos();
        res.status(200).json(productos);
    } catch (error) {
        res
        .status(400)
        .json({
            message: "Error al obtener los productos"
        //error: getErrorMessage(error),
      });
    }
};

// Obtener un producto por su id
export const getProductoById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const producto = await productoService.findProductoById(id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al obtener el producto",
            //error: getErrorMessage(error),
        });
    }
};

// Crear un producto
export const createProducto = async (req: Request, res: Response) => {
    try {
        const producto = req.body;
        const productoCreado = await productoService.createProducto(producto);
        res.status(201).json(productoCreado);
    } catch (error) {
        res.status(400).json({
            message: "Error al crear el producto",
            //error: getErrorMessage(error),
        });
    }
};

// Actualizar un producto
export const updateProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const producto = req.body;
        const productoActualizado = await productoService.updateProducto(parseInt(id), producto);
        
        if (productoActualizado[0] === 1) {
            res.status(200).json({ message: "Producto actualizado" });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar el producto",
            //error: getErrorMessage(error),
        });
    }
};  

// Eliminar un producto
export const deleteProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productoEliminado = await productoService.deleteProducto(parseInt(id));
        
        if (productoEliminado === 1) {
            res.status(200).json({ message: "Producto eliminado" });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al eliminar el producto",
            //error: getErrorMessage(error),
        });
    }
};

