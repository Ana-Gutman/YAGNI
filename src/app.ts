import express from 'express';
import dotenv from 'dotenv';
import { dbSync } from './shared/database/sync';
import usuarioRoutes from './usuarioClientes/routes/usuarioRoutes';
import sequelize from './shared/database/database';
import productoRoutes from './pedidosProductos/routes/productoRoutes';
import localRoutes from './inventario/routes/localRoutes';
import { errorMiddleware } from './shared/middleware/errorMiddleware';

dotenv.config();
const app = express();
const main = async () => {
  await dbSync();

  app.use(express.json());
  app.use("/api", usuarioRoutes);
  app.use("/api", productoRoutes);
  app.use("/api", localRoutes);


  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorMiddleware(err, req, res, next);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async() => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    try {
      await sequelize.authenticate();
      console.log(
        "La conexión con la base de datos ha sido establecida correctamente."
      );
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
    }
  });
};

main();









