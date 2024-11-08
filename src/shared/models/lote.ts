import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';
export class Lote extends Model {
    public id_lote!: number;
    public id_producto!: number;
    public id_cocina!: number;
    public id_local_destino!: number;
    public id_refrigerador!: string;
    public fecha_elaboracion!: Date;
    public cantidad!: number;
    public fecha_retirado!: Date | null;
  }
  
  Lote.init(
    {
      id_lote: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      id_producto: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'Productos', key: 'id_producto' },
        allowNull: false,
      },
      id_cocina: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'Cocinas', key: 'id_cocina' },
        allowNull: false,
      },
      id_local_destino: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'Locales', key: 'id_local' },
        allowNull: false,
      },
      id_refrigerador: {
        type: DataTypes.UUID,
        references: { model: 'Refrigeradores', key: 'id_refrigerador' },
        allowNull: false,
      },
      fecha_elaboracion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_retirado: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Lotes',
      timestamps: true,
    }
  );
  