import amqp from 'amqplib';
import { Lote } from '../../shared/models/lote';

export const publishLoteNotification = async (lote: Lote) => {
  const connection = await amqp.connect('amqp://user:secret@localhost:5672');
  const channel = await connection.createChannel();
  const queue = `cocina-${lote.id_cocina}-notifications`;

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(lote)));

  console.log(`Lote ${lote.id_lote} enviado a la cola ${queue}`);
  await channel.close();
  await connection.close();
};
