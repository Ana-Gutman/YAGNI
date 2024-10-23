import express from 'express';
import dotenv from 'dotenv';
import { dbSync } from './shared/database/sync';

// Cargar variables de entorno desde .env
dotenv.config();

// Crear la instancia de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Sincronizar la base de datos
dbSync().then(() => {
  console.log('Base de datos sincronizada');
});

// Definir una ruta básica de prueba
app.get('/', (req, res) => {
  res.send('¡Hola, el servidor está funcionando!');
});

// Definir puerto en base a variables de entorno o usar 3000 por defecto
const PORT = process.env.PORT || 3000;

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
