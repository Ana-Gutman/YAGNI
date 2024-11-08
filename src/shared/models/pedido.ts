import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Pedido extends Model {
  public id_pedido!: number;
  public id_cliente!: number;
  public id_local!: number;
  public fecha_pedido!: Date;
  public hora_realizado!: Date | null;
  public hora_retirado!: Date | null;
  public estado!: 'Completo' | 'Incompleto';
}

Pedido.init(
  {
    id_pedido: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: 'Clientes', key: 'id_cliente' },
      allowNull: false,
    },
    id_local: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: 'Locales', key: 'id_local' },
      allowNull: false,
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora_realizado: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hora_retirado: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM('Completo', 'Incompleto'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Pedidos',
    timestamps: true,
  }
);
