import Redis from 'redis';

const redisClient = Redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379
});

redisClient.on('connect', () => {
  console.log('Conectado a Redis');
});

export default redisClient;
