import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class Producto extends Model {
  public id_producto!: number;
  public nombre!: string;
  public descripcion!: string;
  public ingredientes!: string;
  public precioLista!: number;
}

Producto.init(
  {
    id_producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ingredientes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    precioLista: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Productos',
    timestamps: false,
  }
);
