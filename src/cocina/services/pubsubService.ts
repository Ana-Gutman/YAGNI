import connectRabbitMQ from '../../shared/database/rabbitmq';

export const publishProductReady = async (product: any) => {
  const channel = await connectRabbitMQ();
  const queue = 'product_ready_queue';
  
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(product)), {
    persistent: true,
  });

  console.log(`Producto listo enviado a la cola: ${JSON.stringify(product)}`);
};
