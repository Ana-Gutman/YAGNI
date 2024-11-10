import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';
export class Lote extends Model {
    public id_lote!: number;
    public id_cocina!: number;
    public id_local_destino!: number;
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
  