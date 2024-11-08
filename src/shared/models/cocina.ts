import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Cocina extends Model {
  public id_cocina!: number;
  public direccion!: string;
}

Cocina.init(
  {
    id_cocina: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Cocinas',
    timestamps: false,
  }
);


