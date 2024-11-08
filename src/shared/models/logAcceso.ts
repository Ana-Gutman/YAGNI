import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class LogAcceso extends Model {
    public id_log!: number;
    public id_actor!: number;
    public tipo_actor!: 'Usuario' | 'Cliente';
    public accion!: string;
    public timestamp!: Date;
  }
  
  LogAcceso.init(
    {
      id_log: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      id_actor: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      tipo_actor: {
        type: DataTypes.ENUM('Usuario', 'Cliente'),
        allowNull: false,
      },
      accion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Log_Accesos',
      timestamps: true,
    }
  );
  