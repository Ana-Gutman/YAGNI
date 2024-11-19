import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Usuario extends Model {
  public id_usuario!: number;
  public nombre!: string;
  public rol!: string;
}

Usuario.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    uid_firebase: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('Admin', 'Supervisor Cocina', 'Supervisor Local', 'Dispositivo', 'Cliente', 'Repartidor'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Usuarios',
    timestamps: true,
  }
);
