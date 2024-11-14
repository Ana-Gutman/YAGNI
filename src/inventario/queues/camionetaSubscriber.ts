import amqp from 'amqplib';
import { Cocina } from '../../shared/models/cocina';
import { Camioneta } from '../../shared/models/camioneta';
import { ActualCamioneta, siguienteCamioneta } from '../config';

export const startListeningForLotes = async () => {
  const connection = await amqp.connect('amqp://user:secret@localhost:5672');
  const channel = await connection.createChannel();

  const cocinas = await Cocina.findAll();
  const camioneta = await Camioneta.findOne({ where: { id_camioneta: ActualCamioneta } });

  if (!camioneta) {
    siguienteCamioneta();
  }

  console.log(`Escuchando notificaciones para la camioneta ${ActualCamioneta}...`);

  for (const co of cocinas) {
    const queue = `cocina-${co.id_cocina}-notifications`;

    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, (msg) => {
      if (msg) {
        const lote = JSON.parse(msg.content.toString());
        console.log(`Camioneta con id ${ActualCamioneta} recibió notificación para buscar Lote: `, lote);
      }
    });
  }

  console.log('Escuchando notificaciones de Lotes...');
};

