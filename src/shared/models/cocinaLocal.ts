import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database'; 

export class CocinaLocal extends Model {}
CocinaLocal.init(
  {
    id_cocina: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    id_local: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'CocinaLocal',
    tableName: 'CocinasLocales',
    timestamps: false,
  }
);