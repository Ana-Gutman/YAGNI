import { ValidationError, DatabaseError, NotFoundError, GeneralError } from '../errors';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Response<any> | void => {
    console.error(err);
  
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: err.message });
    }
  
    if (err instanceof NotFoundError) {
      return res.status(404).json({ message: err.message });
    }

    if (err instanceof DatabaseError) {
      return res.status(500).json({ message: `Error en la base de datos: ${err.message}` });
    }
  
    return res.status(500).json({ message: `Error desconocido: ${err.message}` });
  };
