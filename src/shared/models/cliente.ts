import sequelize from '../database/database';
import { DataTypes, Model } from "sequelize";

export class Cliente extends Model {
    public id_cliente!: number;
    public nombre!: string;
    public celular!: string;
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
      celular: {
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
  