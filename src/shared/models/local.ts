import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Local extends Model {
  public id_local!: number;
  public nombre!: string;
  public direccion!: string;
}

Local.init(
  {
    id_local: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Locales',
    timestamps: false,
  }
);
