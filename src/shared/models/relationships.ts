import { Usuario } from './usuario';
import { Producto } from './producto';
import { Pedido } from './pedido';
import { Camioneta } from './camioneta';
import { Cocina } from './cocina';
import { Refrigerador } from './refrigerador';
import { Local } from './local';
import { Cliente } from './cliente';
import { ProductoPedido } from './productoPedido';
import { Lote } from './lote';
import { LogAcceso } from './logAcceso';
import { MedioPago } from './medioPago';
import { ProductoEnvasado } from './productoEnvasado';
import { MedioPagoCliente } from './medioPagoCliente';
import { MarcaRefrigerador } from './marcaRefrigerador';
import { ProductoRefrigerador } from './productoRefrigerador';

export const setRelationships = async () => {
  Local.hasMany(Refrigerador, { foreignKey: 'id_local' });
  Refrigerador.belongsTo(Local, { foreignKey: 'id_local' });

  Cliente.belongsToMany(MedioPago, { through: MedioPagoCliente, foreignKey: 'id_cliente' });
  MedioPago.belongsToMany(Cliente, { through: MedioPagoCliente, foreignKey: 'id_medio_pago' });

  Refrigerador.belongsTo(MarcaRefrigerador, { foreignKey: 'marca_nombre', targetKey: 'nombre',as: 'marcaRefrigerador',  });
  MarcaRefrigerador.hasMany(Refrigerador, {foreignKey: 'marca_nombre', sourceKey: 'nombre', as: 'refrigeradores', });

  Refrigerador.hasMany(ProductoRefrigerador, { foreignKey: 'id_refrigerador' });
  ProductoRefrigerador.belongsTo(Refrigerador, { foreignKey: 'id_refrigerador' });
  Producto.hasMany(ProductoRefrigerador, { foreignKey: 'id_producto' });
  ProductoRefrigerador.belongsTo(Producto, { foreignKey: 'id_producto' });

  Cliente.hasMany(Pedido, { foreignKey: 'id_cliente' });
  Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente' });
  MedioPago.hasMany(Pedido, { foreignKey: 'id_medio_pago'});
  Pedido.belongsTo(MedioPago, { foreignKey: 'id_medio_pago' });
  Local.hasMany(Pedido, { foreignKey: 'id_local' });
  Pedido.belongsTo(Local, { foreignKey: 'id_local' });

  Pedido.belongsToMany(Producto, {through: ProductoPedido, foreignKey: 'id_pedido' });
  Producto.belongsToMany(Pedido, {through: ProductoPedido, foreignKey: 'id_producto' });

  Producto.hasMany(Lote, { foreignKey: { name: 'id_producto'} });
  Lote.belongsTo(Producto, { foreignKey: { name: 'id_producto' } });
  Cocina.hasMany(Lote, { foreignKey: { name: 'id_cocina'} });
  Lote.belongsTo(Cocina, { foreignKey: { name: 'id_cocina'} });
  Local.hasMany(Lote, { foreignKey: { name: 'id_local_destino'} });
  Lote.belongsTo(Local, { foreignKey: { name: 'id_local_destino'} });
  Refrigerador.hasMany(Lote, { foreignKey: { name: 'id_refrigerador' } });
  Lote.belongsTo(Refrigerador, { foreignKey: { name: 'id_refrigerador'} });

  Usuario.hasMany(LogAcceso, { foreignKey: 'id_actor', constraints: false });
  Cliente.hasMany(LogAcceso, { foreignKey: 'id_actor', constraints: false });
  LogAcceso.belongsTo(Usuario, { foreignKey: 'id_actor', constraints: false, scope: { tipo_actor: 'Usuario' } });
  LogAcceso.belongsTo(Cliente, { foreignKey: 'id_actor', constraints: false, scope: { tipo_actor: 'Cliente' } });

  ProductoEnvasado.belongsTo(Producto, { foreignKey: 'id_producto' });
  ProductoEnvasado.belongsTo(Cocina, { foreignKey: 'id_cocina' });
  ProductoEnvasado.belongsTo(Lote, { foreignKey: 'id_lote' });
  Producto.hasMany(ProductoEnvasado, { foreignKey: 'id_producto' });
  Cocina.hasMany(ProductoEnvasado, { foreignKey: 'id_cocina' });
  Refrigerador.hasMany(ProductoEnvasado, { foreignKey: 'id_lote' });
};
