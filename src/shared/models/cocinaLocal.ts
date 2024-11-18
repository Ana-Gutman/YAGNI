import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database'; 
import { Cocina } from './cocina';
import { Local } from './local';

export class CocinaLocal extends Model {
  public id_cocina!: number;
  public id_local!: number;
}
CocinaLocal.init(
  {
    id_cocina: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Cocina,
        key: 'id_cocina',
    },
    },
    id_local: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      references: {
        model: Local,
        key: 'id_local',
    },
    },
  },
  {
    sequelize,
    modelName: 'CocinaLocal',
    tableName: 'CocinasLocales',
    timestamps: false,
  }
);