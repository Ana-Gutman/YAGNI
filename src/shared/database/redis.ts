import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379', // Conectar al Redis local
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  console.log('Redis conectado');
};

export default redisClient;
