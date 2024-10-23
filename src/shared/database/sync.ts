import { Sequelize } from 'sequelize';
import { setRelationships } from '../models/relationships'; // Archivo donde estarán las relaciones
import { Producto } from '../models/producto';
import { Pedido } from '../models/pedido';
import { Usuario } from '../models/usuario';

const syncTables = async () => {
  try {
    if (process.env.DB_SYNC === 'true') {
      await Producto.sync();
      await Pedido.sync();
      await Usuario.sync();
      console.log('Los modelos fueron sincronizados con la base de datos.');
    }
  } catch (error) {
    console.error('Error al sincronizar los modelos con la base de datos:', error);
  }
};

const dbSync = async () => {
  await setRelationships(); // Establecer relaciones antes de sincronizar
  await syncTables();       // Sincronizar las tablas
};

export { Sequelize, dbSync };
