import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class HistorialProductoRefrigerador extends Model {
  public id_historial!: number;
  public id_refrigerador!: number;
  public id_producto!: number;
  public cantidad!: number;
}

HistorialProductoRefrigerador.init(
  {
    id_historial: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_refrigerador: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'Refrigerador', key: 'id_refrigerador' },
    },
    id_producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'Producto', key: 'id_producto' },
    },
    cantidad: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'HistorialProductoRefrigerador',
    tableName: 'Historial_productos_refrigerador',
    timestamps: true,
  }
);
