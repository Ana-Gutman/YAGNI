import amqp from 'amqplib';
import { ActualCocina, siguienteCocina } from '../config';

export const publishPedidoNotification = async (productosPedido: {id_producto: number; cantidad: number;}[], id_local: number) => {
  const connection = await amqp.connect('amqp://user:secret@localhost:5672');
  const channel = await connection.createChannel();
  const exchange = 'exchange_pedidos';

  await channel.assertExchange(exchange, 'direct', { durable: true });
  const routingKey = `cocina.${ActualCocina}`; 
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify({productosPedido, id_local})));
  
  console.log(`Publicado nuevo pedido para el local ${id_local}`);
  
  await siguienteCocina();
  await channel.close();
  await connection.close();
};
