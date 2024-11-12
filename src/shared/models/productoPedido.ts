import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class ProductoPedido extends Model {
    public id_pedido!: number;
    public id_producto!: number;
    public cantidad!: number;
  }
  
  ProductoPedido.init(
    {
      id_pedido: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'Pedidos', key: 'id_pedido' },
        allowNull: false,
      },
      id_producto: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'Productos', key: 'id_producto' },
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductoPedido',
      tableName: 'Productos_Pedidos',
      timestamps: true,
    }
  );
  