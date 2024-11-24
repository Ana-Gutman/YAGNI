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
  const url = `${BASE_URL}refrigeradores/existencias`;
  const payload = JSON.stringify({
    idProducto: '1',
    fechaInicio: '2024-01-01',
    fechaFin: '2024-01-31',
  });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // Simula espera entre solicitudes
}