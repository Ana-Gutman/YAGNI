import { BelongsToGetAssociationMixin, BelongsToManyAddAssociationMixin, DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';
import { Producto } from './producto';
import { MarcaRefrigerador } from './marcaRefrigerador';

export class Refrigerador extends Model {
  public id_refrigerador!: number;
  public marca_nombre!: string;
  public id_local!: number;
  public addProducto!: BelongsToManyAddAssociationMixin<Producto, number>;
  public getMarcaRefrigerador!: BelongsToGetAssociationMixin<MarcaRefrigerador>;
}

Refrigerador.init(
  {
    id_refrigerador: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    marca_nombre: {
      type: DataTypes.STRING,
      references: { model: 'MarcasRefrigerador', key: 'nombre' },
      allowNull: false,
    },
    id_local: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: { model: 'Locales', key: 'id_local' },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Refrigerador',
    tableName: 'Refrigeradores',
    timestamps: false,
  }
);
