import { Producto } from './producto';
import { Pedido } from './pedido';
import { Usuario } from './usuario';

export const setRelationships = async () => {
  Producto.hasMany(Pedido, { foreignKey: 'productoId', as: 'pedidos' });
  Pedido.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });

  // Puedes agregar más relaciones si es necesario
};
