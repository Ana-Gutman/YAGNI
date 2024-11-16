import Bull from 'bull';
import redisClient from '../database/redis';

const pedidoQueue = new Bull('pedido', {
  redis: {
    host: 'localhost',
    port: 6379
  }
});

pedidoQueue.process(async (job) => {
  const { data } = job;
  console.log(`Procesando pedido: ${JSON.stringify(data)}`);
});

export default pedidoQueue;
