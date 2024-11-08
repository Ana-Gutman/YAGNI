import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

export class Existencia extends Model {
    public id_existencia!: number;
    public id_refrigerador!: string;
    public id_producto!: number;
    public cantidad!: number;
    public fecha_registro!: Date;
  }
  
  Existencia.init(
    {
      id_existencia: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      id_refrigerador: {
        type: DataTypes.UUID,
        references: { model: 'Refrigeradores', key: 'id_refrigerador' },
        allowNull: false,
      },
      id_producto: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'Productos', key: 'id_producto' },
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Existencia',
      timestamps: true,
    }
  );
  