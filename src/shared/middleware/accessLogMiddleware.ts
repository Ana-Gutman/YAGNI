import { Request, Response, NextFunction } from 'express';
import client from '../utils/elasticsearchClient';

const accessLogger = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user || { };
    const actor = user.id_usuario ||  "anonymous";
    const permissions = user.rol || "unknown";
    const action = `${req.method} ${req.path}`;
    const timestamp = new Date();

    await client.index({
      index: 'access_logs',
      document: {
        actor,
        permissions,
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
