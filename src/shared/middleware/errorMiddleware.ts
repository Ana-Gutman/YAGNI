import { MissingParameterError, InvalidValueError, RequiredFieldError, DatabaseError, NotFoundError, GeneralError } from '../utils/customErrors';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
): Response<any> | void => {
    console.error(err.stack);

    if (err instanceof MissingParameterError) {
        return res.status(400).json({
            error: {
                name: err.name,
                message: err.message,
                code: 'MISSING_PARAMETER' 
            }
        });
    }

    if (err instanceof InvalidValueError) {
        return res.status(400).json({
            error: {
                name: err.name,
                message: err.message,
                code: 'INVALID_VALUE'
            }
        });
    }

    if (err instanceof RequiredFieldError) {
        return res.status(400).json({
            error: {
                name: err.name,
                message: err.message,
                code: 'REQUIRED_FIELD'
            }
        });
    }

    if (err instanceof DatabaseError) {
        return res.status(500).json({
            error: {
                name: err.name,
                message: `Error en la base de datos: ${err.message}`,
                code: 'DATABASE_ERROR',
            }
        });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({
            error: {
                name: err.name,
                message: err.message,
                code: 'NOT_FOUND',
            }
        });
    }

    if (err instanceof GeneralError) {
        return res.status(500).json({
            error: {
                name: err.name,
                message: err.message,
                code: 'GENERAL_ERROR',
            }
        });
    }

    return res.status(500).json({
        error: {
            name: "UnknownError",
            message: `Error desconocido: ${err.message}`,
            code: 'UNKNOWN_ERROR',
        }
    });
};
