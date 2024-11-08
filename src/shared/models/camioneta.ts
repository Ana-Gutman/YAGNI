import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Camioneta extends Model {
  public idVehiculo!: number;
  public matricula!: string;
}

Camioneta.init(
  {
    idVehiculo: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Camionetas',
    timestamps: false,
  }
);
