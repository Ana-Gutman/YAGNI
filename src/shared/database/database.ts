import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME || 'obligatorio_arq',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'secret',
  {
    host: process.env.DB_HOST!,
    dialect: process.env.DB_DIALECT ?? ("mysql" as any),
    port: parseInt(process.env.DB_PORT!, 10) ?? (3306 as any),
    dialectOptions: {
      connectTimeout: 60000, 
    },
    logging: console.log,
  }
);

export default sequelize;
