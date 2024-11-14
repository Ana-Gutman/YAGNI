import amqp from 'amqplib';
import { CocinaCamioneta } from '../../shared/models/cocinaCamioneta';

export const startListeningForLotes = async () => {
  const connection = await amqp.connect('amqp://user:secret@localhost:5672');
  const channel = await connection.createChannel();

  const cocinaCamionetas = await CocinaCamioneta.findAll();

  for (const cc of cocinaCamionetas) {
    const queue = `cocina-${cc.id_cocina}-notifications`;
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
      if (msg) {
        const lote = JSON.parse(msg.content.toString());
        console.log(`Camioneta asociada a Cocina ${cc.id_camioneta} recibió notificación de Lote:`, lote);
      }
    });
  }

  console.log('Escuchando notificaciones de Lotes...');
};

startListeningForLotes();
