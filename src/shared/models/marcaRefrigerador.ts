import { Association, DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';
import { Refrigerador } from './refrigerador';

export class MarcaRefrigerador extends Model {
  public nombre!: string;
  public tipo_codigo!: 'QR' | 'NFC';

  public readonly refrigeradores?: Refrigerador[];
  public static associations: {
    refrigeradores: Association<MarcaRefrigerador, Refrigerador>;
  };
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
    modelName: 'MarcaRefrigerador',
    tableName: 'MarcasRefrigerador',
    timestamps: false,
  }
);
