import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class DetallePedido extends Model {
    public id_detalle_pedido!: number;
    public id_pedido!: number;
    public id_producto!: number;
    public cantidad!: number;
  }
  
  DetallePedido.init(
    {
      id_detalle_pedido: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
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
      tableName: 'Detalle_Pedidos',
      timestamps: true,
    }
  );
  