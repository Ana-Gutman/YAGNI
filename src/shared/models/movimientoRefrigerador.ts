import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';
import { Producto } from './producto';
import { Refrigerador } from './refrigerador';

export class MovimientoRefrigerador extends Model {
  public id_movimiento!: number;
  public id_refrigerador!: number;
  public id_producto!: number;
  public cantidad_cambiada!: number;
  public fecha!: Date;
}

MovimientoRefrigerador.init(
  {
    id_movimiento: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_refrigerador: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Refrigerador,
        key: 'id_refrigerador',
      },
    },
    id_producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Producto,
        key: 'id_producto',
      },
    },
    cantidad_cambiada: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    }
    },
  {
    sequelize,
    modelName: 'MovimientoRefrigerador',
    tableName: 'Movimientos_refrigerador',
    timestamps: false,
  }
);

