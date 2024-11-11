import sequelize from '../database/database';
import { DataTypes, Model, BelongsToManyAddAssociationMixin } from "sequelize";
import { MedioPago } from './medioPago';

export class Cliente extends Model {
    public id_cliente!: number;
    public nombre!: string;
    public celular!: string;
    public addMedioPago!: BelongsToManyAddAssociationMixin<MedioPago, number>;
  }
  
  Cliente.init(
    {
      id_cliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      celular: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Cliente',
      tableName: 'Clientes',
      timestamps: true,
    }
  );
  