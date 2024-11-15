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
        const { otp, productos } = req.body; // productos: [{id_producto, cantidad}]
        const resultado = await refrigeradorService.validarIngresoStock(idRefrigerador, otp, productos);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};


export const obtenerRefrigeradoresPorLocal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idLocal } = req.params;
        const refrigeradores = await refrigeradorService.obtenerRefrigeradoresPorLocal(idLocal);
        res.status(200).json(refrigeradores);
      } catch (error) {
        next(error);
      }
};


export const modificarInventarioConOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRefrigerador = req.params.idRefrigerador;
      const { otp, productos, operacion } = req.body; // operacion: 'agregar' o 'retirar'
  
      await refrigeradorService.modificarInventarioConOTP(idRefrigerador, otp, productos, operacion);
      res.status(200).json({ message: `Stock ${operacion}do exitosamente` });
    } catch (error) {
      next(error);
    }
  };
  
  