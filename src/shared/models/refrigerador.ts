import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Refrigerador extends Model {
  public id_refrigerador!: number;
  public marca!: string;
  public id_local!: number;
}

Refrigerador.init(
  {
    id_refrigerador: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_codigo: {
      type: DataTypes.ENUM('QR', 'NFC'),
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
