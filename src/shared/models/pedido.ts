import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { Producto } from './producto';

export class Pedido extends Model {
  public id!: number;
  public total!: number;
  public productoId!: number;
}

Pedido.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'pedidos',
    timestamps: true,
  }
);

// Pedido.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });
// Producto.hasMany(Pedido, { foreignKey: 'productoId', as: 'pedidos' });
