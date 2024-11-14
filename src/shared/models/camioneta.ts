import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Camioneta extends Model {
  public id_camioneta!: number;
  public matricula!: string;
}

Camioneta.init(
  {
    id_camioneta: {
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
