import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Usuario extends Model {
  public id_usuario!: number;
  public nombre!: string;
  public rol!: string;
  public uid_firebase!: string;
  public id_cocina?: number;
  public id_vehiculo?: number;
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
    id_cocina: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Cocinas',
        key: 'id_cocina',
      },
      allowNull: true,
    },
    id_camioneta: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Camionetas',
        key: 'id_camioneta',
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Usuarios',
    timestamps: true,
  }
);
