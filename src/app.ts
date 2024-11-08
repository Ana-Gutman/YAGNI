import express from 'express';
import dotenv from 'dotenv';
import { dbSync } from './shared/database/sync';
import usuarioRoutes from './backoffice/routes/usuarioRoutes';
import sequelize from './shared/database/database';

dotenv.config();
const app = express();
const main = async () => {
  await dbSync();

  app.use(express.json());
  app.use("/api", usuarioRoutes);

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









