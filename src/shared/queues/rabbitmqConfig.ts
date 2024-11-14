import amqplib from 'amqplib';
import amqp from 'amqplib';

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://user:secret@rabbitmq:5672');
    const channel = await connection.createChannel();
    console.log('Conectado a RabbitMQ');
    // Aquí puedes agregar las colas y suscripciones
  } catch (error) {
    console.error('Error al conectar con RabbitMQ:', error);
  }
};

connectRabbitMQ();


