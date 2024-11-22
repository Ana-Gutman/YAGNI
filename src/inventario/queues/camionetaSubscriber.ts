import amqp from 'amqplib';

let consumerCamionetas: { [key: number]: any } = {}; 

export const startListeningForLotes = async (camionetaId: number, onCreatedLote: (loteData: any) => void) => {
  const connection = await amqp.connect('amqp://user:secret@localhost:5672');
  const channel = await connection.createChannel();
  const exchange = 'exchange_lotes';
  
  const queue = `cola_camioneta_${camionetaId}`;

  await channel.assertExchange(exchange, 'direct', { durable: true });
  await channel.assertQueue(queue, { durable: true });

  const routingKey = `camioneta.${camionetaId}`;
  await channel.bindQueue(queue, exchange, routingKey);

  consumerCamionetas[camionetaId] = channel;
  console.log(`Camioneta ${camionetaId} esperando lotes...`);
  
  channel.consume(queue, (message) => {
    if (message) {
      const loteData = JSON.parse(message.content.toString());
      console.log(`Lote recibido por la camioneta ${camionetaId}:`, loteData);
      onCreatedLote(loteData); // Notificar al WebSocket
      channel.ack(message); 
    }
  });
};

