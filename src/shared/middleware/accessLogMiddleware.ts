import { Request, Response, NextFunction } from 'express';
import client from '../utils/elasticsearchClient';

const accessLogger = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const actor = req.body.user || { id: 'unknown', permissions: [] }; // Asegúrate de usar tu sistema de autenticación
    const action = `${req.method} ${req.path}`;
    const timestamp = new Date();

    await client.index({
      index: 'access_logs',
      document: {
        actor: actor.id,
        permissions: actor.permissions,
        action,
        timestamp,
      },
    });

    next();
  } catch (err) {
    console.error('Error registrando acceso:', err);
    next(err);
  }
};

export default accessLogger;
