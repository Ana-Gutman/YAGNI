import connectRabbitMQ from '../shared/database/rabbitmq';

export const subscribeToProductReady = async () => {
  const channel = await connectRabbitMQ();
  const queue = 'product_ready_queue';
  
  await channel.assertQueue(queue, { durable: true });
  console.log('Esperando productos listos...');

  channel.consume(queue, (msg: any) => {
    if (msg !== null) {
      const product = JSON.parse(msg.content.toString());
      console.log(`Producto listo recibido: ${product.nombre}`);
      // Procesar el producto recibido en logística
      channel.ack(msg);
    }
  });
};
