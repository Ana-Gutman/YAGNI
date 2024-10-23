import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde .env

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT!, 10) || 3306,
    dialectOptions: {
      connectTimeout: 60000, // Opcional, dependiendo de los tiempos de espera
    },
    logging: console.log, // Puedes desactivarlo si no quieres ver las consultas SQL
  }
);

export default sequelize;
