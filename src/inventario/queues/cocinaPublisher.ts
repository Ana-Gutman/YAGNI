import amqp from 'amqplib';
import { Lote } from '../../shared/models/lote';
import { CocinaRepository } from '../repositories/cocinaRepository';

const cocinaCamionetaIndex: Record<number, number> = {};

export const publishLoteNotification = async (lote: Lote) => {
  const connection = await amqp.connect('amqp://user:secret@localhost:5672');
  const channel = await connection.createChannel();
  const exchange = 'exchange_lotes';

  await channel.assertExchange(exchange, 'direct', { durable: true });

  const cocinaRepository = new CocinaRepository();
  const listaIdsCamionetasDeCocina = await cocinaRepository.getCamionetaIdsDeCocina(lote.id_cocina);
  if (!listaIdsCamionetasDeCocina.length) {
    throw new Error(`No se encontraron camionetas para la cocina ${lote.id_cocina}`);
  }

  if (!(lote.id_cocina in cocinaCamionetaIndex)) {
    cocinaCamionetaIndex[lote.id_cocina] = 0;
  }
  const indiceActual = cocinaCamionetaIndex[lote.id_cocina];
  const id_camioneta = listaIdsCamionetasDeCocina[indiceActual];

  const routingKey = `camioneta.${id_camioneta}`; 
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(lote)));
  
  console.log(`Publicado nuevo lote para de cocina ${lote.id_cocina}`);
  
  cocinaCamionetaIndex[lote.id_cocina] = (indiceActual + 1) % listaIdsCamionetasDeCocina.length;
  await channel.close();
  await connection.close();
};
