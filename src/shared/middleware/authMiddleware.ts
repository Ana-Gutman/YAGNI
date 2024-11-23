import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationError, AuthorizationError } from "../utils/customErrors";

const authorize =
  (allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new AuthenticationError("No autorizado: falta token"));
    }

    try {
      const decoded: any = jwt.verify(token, "AIzaSyBurpEG9jJ1C3dMLNkN9FFsQgncSAWrDJg");

      if (!allowedRoles.includes(decoded.rol)) {
        return next(new AuthorizationError("Permisos insuficientes para esta acción"));
      }

      req.body.user = {
        id_usuario: decoded.id,
        rol: decoded.rol,
      };

      next(); 
    } catch (err) {
      return next(new AuthenticationError("Token inválido o expirado"));
    }
  };

export default authorize;
