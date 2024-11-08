import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Refrigerador extends Model {
  public id_refrigerador!: string;
  public marca!: string;
  public id_local!: number;
}

Refrigerador.init(
  {
    id_refrigerador: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_local: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: 'Locales', key: 'id_local' },
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Refrigeradores',
    timestamps: false,
  }
);
