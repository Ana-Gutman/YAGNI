import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';
import { Producto } from './producto';
import { Refrigerador } from './refrigerador';

export class ProductoRefrigerador extends Model {
  public id_refrigerador!: number;
  public id_producto!: number;
  public cantidad!: number;
}

ProductoRefrigerador.init(
  {
    id_refrigerador: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Producto,  
        key: 'id_refrigerador',
      },
    },
    id_producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Refrigerador,  
        key: 'id_producto',
      },
    },
    cantidad: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,     
    },
  },
  {
    sequelize,
    modelName: 'ProductoRefrigerador',
    tableName: 'Productos_refrigerador',
    timestamps: false, 
  }
);
