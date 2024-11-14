import amqp from 'amqplib';

let consumerCocinas: { [key: number]: any } = {}; 

export const startListeningForPedidos = async (cocinaId: number) => {
  const connection = await amqp.connect('amqp://user:secret@localhost:5672');
  const channel = await connection.createChannel();
  const exchange = 'exchange_pedidos';

  const queue = `cola_cocina_${cocinaId}`;

  await channel.assertExchange(exchange, 'direct', { durable: true });
  await channel.assertQueue(queue, { durable: true });

  const routingKey = `cocina.${cocinaId}`;
  await channel.bindQueue(queue, exchange, routingKey);

  consumerCocinas[cocinaId] = channel;
  console.log(`Cocina ${cocinaId} esperando pedidos...`);

  channel.consume(queue, (message) => {
    if (message) {
      const pedidoData = JSON.parse(message.content.toString());
      console.log(`Pedido recibido por la cocina ${cocinaId}:`, pedidoData);
      channel.ack(message);
    }
  });
};
