import sequelize from '../database/database';
import { DataTypes, Model } from "sequelize";

export class Cliente extends Model {
    public id_cliente!: number;
    public nombre!: string;
    public numero_celular!: string;
  }
  
  Cliente.init(
    {
      id_cliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero_celular: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Clientes',
      timestamps: true,
    }
  );
  