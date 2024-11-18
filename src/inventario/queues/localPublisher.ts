import amqp from 'amqplib';
import { LocalRepository } from '../repositories/localRepository';

export const publishPedidoNotification = async (productosPedido: {id_producto: number; cantidad: number;}[], id_local: number) => {
  const connection = await amqp.connect('amqp://user:secret@localhost:5672');
  const channel = await connection.createChannel();
  const exchange = 'exchange_pedidos';

  await channel.assertExchange(exchange, 'direct', { durable: true });

  const localRepository = new LocalRepository();
  const cocina = await localRepository.getCocinaDeLocal(id_local);
  if (!cocina) {
    throw new Error(`No se encontró la cocina del local ${id_local}`);
  }
  const id_cocina = cocina.id_cocina;
  const routingKey = `cocina.${id_cocina}`; 
  
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify({productosPedido, id_local})));
  
  console.log(`Publicado nuevo pedido para el local ${id_local}`);
  
  await channel.close();
  await connection.close();
};
