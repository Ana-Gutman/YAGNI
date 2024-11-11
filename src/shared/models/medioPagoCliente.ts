import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';
import { Cliente } from './cliente';
import { MedioPago } from './medioPago';

export class MedioPagoCliente extends Model {
  public id_cliente!: number;
  public id_medio_pago!: number;
}

MedioPagoCliente.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Cliente,  
        key: 'id_cliente',
      },
    },
    id_medio_pago: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: MedioPago,  
        key: 'id_medio_pago',
      },
    },
  },
  {
    sequelize,
    modelName: 'MedioPagoCliente',
    tableName: 'Medios_pago_cliente',
    timestamps: false, 
  }
);
