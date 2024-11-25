import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { dbSync } from './shared/database/sync';
import usuarioRoutes from './usuarioClientes/routes/usuarioRoutes';
import sequelize from './shared/database/database';
import productoRoutes from './pedidosProductos/routes/productoRoutes';
import pedidoRoutes from './pedidosProductos/routes/pedidoRoutes';
import localRoutes from './inventario/routes/localRoutes';
import { errorMiddleware } from './shared/middleware/errorMiddleware';
import inventarioRoutes from './inventario/routes/InventarioRoutes';
import clienteRoutes from './usuarioClientes/routes/clienteRoutes';
import camionetaRoutes from './inventario/routes/camionetaRoutes';
import cocinaRoutes from './inventario/routes/cocinaRoutes';
import refrigeradorRoutes from './inventario/routes/refrigeradorRoutes';
import lotesRoutes from './inventario/routes/lotesRoutes';
import { connectRedis } from './shared/config/redis';
import { cargarUsuario, initializeRabbitMQAndWebSocket, loadEntidades, loadFakeData } from './shared/database/initialize';
import { startListeningForLotes } from './inventario/queues/camionetaSubscriber';
import { startListeningForPedidos } from './inventario/queues/cocinaSubscriber';
import accessLogger from './shared/middleware/accessLogMiddleware';
import errorLogger from './shared/middleware/errorLogMiddleware';
import { createServer } from 'http';
import { Server as WebSocketServer } from 'socket.io';
import authorize from './shared/middleware/authMiddleware';

dotenv.config();

const app = express();

const main = async () => {
  await connectRedis(); 
  console.log('Redis conectado');

  const httpServer = createServer(app); // Crear servidor HTTP
  const io = new WebSocketServer(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });


  await dbSync();
  //await loadFakeData();
  //await cargarUsuario();
  // await loadEntidades()
  
   
  
  app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));
  app.use(express.json());

  app.use("/api", usuarioRoutes);
  app.use("/api", productoRoutes);
  app.use("/api", pedidoRoutes);
  app.use("/api", localRoutes);
  app.use("/api", clienteRoutes);
  app.use("/api", camionetaRoutes);
  app.use("/api", cocinaRoutes);  
  app.use("/api", refrigeradorRoutes);
  app.use('/api', lotesRoutes);
  app.use('/api',accessLogger, inventarioRoutes);

  app.use(errorLogger);

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorMiddleware(err, req, res, next);
  });

  const PORT = process.env.PORT || 3000;

  httpServer.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    try {
      await sequelize.authenticate();
      console.log("Conexión con la base de datos establecida correctamente.");

      await initializeRabbitMQAndWebSocket(io);
      
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
    }
  });
};

main().catch((err) => {
  console.error('Error al iniciar la aplicación:', err);
});




