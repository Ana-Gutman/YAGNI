import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class LogError extends Model {
    public id_logError!: number;
    public codigo_error!: number;
    public mensaje!: string;
    public timestamp!: Date;
  }
  
  LogError.init(
    {
      id_logError: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      codigo_error: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Log_Errores',
      timestamps: false,
    }
  );
  