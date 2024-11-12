import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class CocinaCamioneta extends Model {}
CocinaCamioneta.init(
  {
    id_cocina: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    id_camioneta: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'CocinaCamioneta',
    tableName: 'CocinasCamionetas',
    timestamps: false,
  }
);