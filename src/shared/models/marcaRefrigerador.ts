import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

export class MarcaRefrigerador extends Model {
  public nombre!: string;
  public tipo_codigo!: 'QR' | 'NFC';
}

MarcaRefrigerador.init(
  {
    nombre:{
      type: DataTypes.STRING,
      primaryKey: true,
    },
    tipo_codigo: {
      type: DataTypes.ENUM('QR', 'NFC'),
      allowNull: false,
    }
},
  {
    sequelize,
    tableName: 'MarcasRefrigerador',
    timestamps: false,
  }
);
