import amqp from 'amqplib';

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    console.log('Conectado a RabbitMQ');
    return channel;
  } catch (error) {
    console.error('Error conectando a RabbitMQ', error);
    throw error;
  }
};

export default connectRabbitMQ;
