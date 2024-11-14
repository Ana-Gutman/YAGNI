import amqp from 'amqplib';
import { Lote } from '../../shared/models/lote';
import { ActualCamioneta, siguienteCamioneta } from '../config';

export const publishLoteNotification = async (lote: Lote) => {
  const connection = await amqp.connect('amqp://user:secret@localhost:5672');
  const channel = await connection.createChannel();
  const exchange = 'exchange_lotes';

  await channel.assertExchange(exchange, 'direct', { durable: true });

  const routingKey = `camioneta.${ActualCamioneta}`; 
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(lote)));
  
  console.log(`Publicado nuevo lote para de cocina ${lote.id_cocina}`);
  
  await siguienteCamioneta();
  await channel.close();
  await connection.close();
};
