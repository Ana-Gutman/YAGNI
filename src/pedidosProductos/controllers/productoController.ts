import { Request, Response } from "express";
import * as productoService from "../services/productoService";

// Obtener todos los productos
export const getProductos = async (req: Request, res: Response) => {
    try{
        const productos = await productoService.getAllProductos();
        res.status(200).json(productos);
    } catch (error) {
        res
        .status(500)
        .json({
            message: "Error al obtener los productos"
      });
    }
};

// Obtener un producto por su id
export const getProductoById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const producto = await productoService.getProductoById(id);
        res.status(200).json(producto);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un producto
export const createProducto = async (req: Request, res: Response) => {
    try {
        const producto = req.body;
        const productoCreado = await productoService.createProducto(producto);
        res.status(201).json(productoCreado);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un producto
export const updateProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const productoDto = req.body;
    try {
        const producto = await productoService.updateProducto(parseInt(id), productoDto);
        res.status(200).json(producto);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};  

// Eliminar un producto
export const deleteProducto = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await productoService.deleteProducto(id);
        res.status(200).json({ message: `Producto con ID ${id} eliminado` });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

