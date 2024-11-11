import { Usuario } from './usuario';
import { Producto } from './producto';
import { Pedido } from './pedido';
import { Camioneta } from './camioneta';
import { Cocina } from './cocina';
import { Refrigerador } from './refrigerador';
import { Local } from './local';
import { Existencia } from './existencia';
import { Cliente } from './cliente';
import { DetallePedido } from './detallePedido';
import { Lote } from './lote';
import { LogAcceso } from './logAcceso';
import { MedioPago } from './medioPago';
import { Produccion } from './produccion';

export const setRelationships = async () => {
  Cocina.belongsToMany(Local, { through: 'Cocina_Locales', foreignKey: 'id_cocina' });
  Local.belongsToMany(Cocina, { through: 'Cocina_Locales', foreignKey: 'id_local' });

  Cocina.belongsToMany(Camioneta, { through: 'Cocina_Camionetas', foreignKey: 'id_cocina' });
  Camioneta.belongsToMany(Cocina, { through: 'Cocina_Camionetas', foreignKey: 'id_camioneta' });

  Local.hasMany(Refrigerador, { foreignKey: 'id_local' });
  Refrigerador.belongsTo(Local, { foreignKey: 'id_local' });

  Refrigerador.belongsToMany(Producto, { through: Existencia, foreignKey: 'id_refrigerador' });
  Producto.belongsToMany(Refrigerador, { through: Existencia, foreignKey: 'id_producto' });

  Cliente.belongsToMany(MedioPago, { through:'Medios_pago_cliente', foreignKey: 'id_cliente' });
  MedioPago.belongsToMany(Cliente, { through:'Medios_pago_cliente', foreignKey: 'id_medio_pago' });

  Cliente.hasMany(Pedido, { foreignKey: 'id_cliente' });
  Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente' });

  Pedido.hasMany(DetallePedido, { foreignKey: 'id_pedido' });
  DetallePedido.belongsTo(Pedido, { foreignKey: 'id_pedido' });

  Producto.hasMany(Lote, { foreignKey: { name: 'id_producto', allowNull: true } });
  Lote.belongsTo(Producto, { foreignKey: { name: 'id_producto', allowNull: true } });

  Cocina.hasMany(Lote, { foreignKey: { name: 'id_cocina', allowNull: true } });
  Lote.belongsTo(Cocina, { foreignKey: { name: 'id_cocina', allowNull: true } });

  Local.hasMany(Lote, { foreignKey: { name: 'id_local_destino', allowNull: true } });
  Lote.belongsTo(Local, { foreignKey: { name: 'id_local_destino', allowNull: true } });

  Refrigerador.hasMany(Lote, { foreignKey: { name: 'id_refrigerador', allowNull: true } });
  Lote.belongsTo(Refrigerador, { foreignKey: { name: 'id_refrigerador', allowNull: true } });

  Usuario.hasMany(LogAcceso, { foreignKey: 'id_actor', constraints: false });
  Cliente.hasMany(LogAcceso, { foreignKey: 'id_actor', constraints: false });
  LogAcceso.belongsTo(Usuario, { foreignKey: 'id_actor', constraints: false, scope: { tipo_actor: 'Usuario' } });
  LogAcceso.belongsTo(Cliente, { foreignKey: 'id_actor', constraints: false, scope: { tipo_actor: 'Cliente' } });

  Produccion.belongsTo(Producto, { foreignKey: 'id_producto' });
  Produccion.belongsTo(Cocina, { foreignKey: 'id_cocina' });
  Produccion.belongsTo(Refrigerador, { foreignKey: 'id_refrigerador' });
  Producto.hasMany(Produccion, { foreignKey: 'id_producto' });
  Cocina.hasMany(Produccion, { foreignKey: 'id_cocina' });
  Refrigerador.hasMany(Produccion, { foreignKey: 'id_refrigerador' });
};
