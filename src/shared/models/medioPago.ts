import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class MedioPago extends Model {
    public id_medio_pago!: number;
    public nombre!: string;
  }
  
  MedioPago.init(
    {
      id_medio_pago: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'MedioPago',
      tableName: 'Medios_Pago',
      timestamps: false,
    }
  );
  