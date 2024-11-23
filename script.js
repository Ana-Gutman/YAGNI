import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Registrar la métrica personalizada
let errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 3000 }, // Modo normal
    { duration: '1m', target: 8000 }, // Modo sobrecargado
    { duration: '30s', target: 0 },   // Descenso
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% de las solicitudes deben responder en menos de 2 segundos
    'errors': ['rate<0.01'],          // Tasa de error debe ser menor al 1%
  },
};

const BASE_URL = 'http://localhost:3000/api';

export default function () {
  // Solicitud GET a usuarios
  let resGetUsuarios = http.get(`${BASE_URL}/usuarios`);

  // Validar respuesta y registrar errores si el estado no es 200
  let success = check(resGetUsuarios, {
    'Obtener usuarios: status is 200': (r) => r.status === 200,
  });

  // Añadir un error si la validación falla
  if (!success) {
    errorRate.add(1);
  }

  sleep(1); // Pausa entre iteraciones
}
