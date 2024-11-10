import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Produccion extends Model {
  public id_produccion!: number;
  public id_producto!: number;
  public id_cocina!: number;
  public id_refrigerador!: number;
  public fecha!: Date;
}

Produccion.init(
  {
    id_produccion: {
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
    id_refrigerador: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: 'Refrigeradores', key: 'id_refrigerador' },
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Producciones',
    timestamps: false,
  }
);
