import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authorize =
  (allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw res.status(401).send("No autorizado");

    try {
      const decoded: any = jwt.verify(token, "AIzaSyBurpEG9jJ1C3dMLNkN9FFsQgncSAWrDJg");
      if (!allowedRoles.includes(decoded.rol)) {
        throw res.status(403).send("Permisos insuficientes");
      }
      req.body.user = decoded;
      next();
    } catch (err) {
      throw res.status(403).send("Token inválido");
    }
  };

export default authorize;
