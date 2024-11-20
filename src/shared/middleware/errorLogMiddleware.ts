import { Request, Response, NextFunction } from 'express';
import client from '../utils/elasticsearchClient';

const errorLogger = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    const timestamp = new Date();

    await client.index({
      index: 'error_logs',
      document: {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
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

