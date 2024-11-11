import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://redis_service:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  console.log('Redis conectado');
};

export default redisClient;
