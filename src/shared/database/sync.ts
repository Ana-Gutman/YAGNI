import { setRelationships } from '../models/relationships'; 
import { Producto } from '../models/producto';
import { Pedido } from '../models/pedido';
import { Usuario } from '../models/usuario';
import { Camioneta } from '../models/camioneta';
import { Cocina } from '../models/cocina';
import { Refrigerador } from '../models/refrigerador';
import { Local } from '../models/local';
import sequelize from './database';
import { Cliente } from '../models/cliente';
import { Existencia } from '../models/existencia';
import { MedioPago } from '../models/medioPago';
import { DetallePedido } from '../models/detallePedido';
import { Lote } from '../models/lote';
import { LogAcceso } from '../models/logAcceso';
import { LogError } from '../models/logError';
import { Produccion } from '../models/produccion';
import { MedioPagoCliente } from '../models/medioPagoCliente';

const syncTables = async () => {
  try {
    if (process.env.DB_SYNC === 'true') {
      await Usuario.sync();
      await Cliente.sync();
      await Producto.sync();
      await Camioneta.sync();
      await Cocina.sync();
      await MedioPago.sync();
      await MedioPagoCliente.sync();
      await Local.sync();
      await Pedido.sync();
      await DetallePedido.sync();
      await Lote.sync();
      await LogAcceso.sync();
      await LogError.sync();
      await Produccion.sync();
      await Refrigerador.sync();
      await Existencia.sync();
      
      
      console.log('Los modelos fueron sincronizados con la base de datos.');
    }
  } catch (error) {
    console.error('Error al sincronizar los modelos con la base de datos:', error);
  }
};

const dbSync = async () => {
  await setRelationships(); 
  await syncTables();
};

export { sequelize, dbSync };
