import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class ProductoEnvasado extends Model {
  public id_envase!: number;
  public id_producto!: number;
  public id_cocina!: number;
  public id_lote!: number;
  public codigo!: string;
}

ProductoEnvasado.init(
  {
    id_envase: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: 'Productos', key: 'id_producto' },
      allowNull: false,
    },
    id_cocina: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: 'Cocinas', key: 'id_cocina' },
      allowNull: false,
    },
    id_lote: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: 'Lotes', key: 'id_lote' },
      allowNull: false,
    },
    codigo: {
      type: DataTypes.ENUM('QR', 'NFC'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ProductoEnvasado',
    tableName: 'Productos_envasados',
    timestamps: true,
  }
);
