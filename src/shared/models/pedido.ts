import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Pedido extends Model {
  public id_pedido!: number;
  public id_cliente!: number;
  public id_medio_pago!: number;
  public id_local!: number;
  public retirado!: Date | null;
  public estado!: 'Iniciado'| 'Completo' | 'Incompleto';
  public createdAt!: Date;
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
    id_medio_pago: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: 'Medios_Pago', key: 'id_medio_pago' },
      allowNull: false,
    },
    id_local: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: 'Locales', key: 'id_local' },
      allowNull: false,
    },
    retirado: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM('Iniciado','Completo', 'Incompleto'),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Pedidos',
    timestamps: true,
  }
);
