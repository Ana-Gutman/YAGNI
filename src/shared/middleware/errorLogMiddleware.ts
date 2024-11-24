import { Request, Response, NextFunction } from 'express';
import client from '../config/elasticsearchClient';

const errorLogger = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    const message = err.message || 'Error desconocido';
    const stack = err.stack || 'Sin stack';
    const path = req.path;
    const method = req.method;
    const timestamp = new Date().toISOString();

    await client.index({
      index: 'error_logs',
      body: {
        message,
        stack,
        path,
        method,
        timestamp,
      },
    });

    console.error('Error registrado:', err.message);
    next(err);
  } catch (logError) {
    console.error('Error al registrar el error:', logError);
    next(err);
  }
};

export default errorLogger;

