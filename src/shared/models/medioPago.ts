import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class MedioPago extends Model {
    public id_medio_pago!: number;
    public id_cliente!: number;
    public identificador!: string;
  }
  
  MedioPago.init(
    {
      id_medio_pago: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      id_cliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'Clientes', key: 'id_cliente' },
        allowNull: false,
      },
      identificador: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Medios_Pago',
      timestamps: false,
    }
  );
  