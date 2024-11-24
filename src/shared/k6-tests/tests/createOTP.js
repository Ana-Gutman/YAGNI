import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

let errorRate = new Rate('errors');
export const options = {
  stages: [
    { duration: '30s', target: 3000 }, // 10 usuarios en el primer segundo
    { duration: '1m', target: 3000}, // Mantén 10 usuarios durante 10 segundos
    { duration: '30s', target: 0 },  // Luego baja a 0 usuarios al final
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% de las peticiones deben ser menores a 1000ms
    errors: ['rate<0.01'], // Menos del 1% de errores
  },
};

// export const options = {
//     stages: [
//       { duration: '30s', target: 3000 }, // 10 usuarios en el primer segundo
//       { duration: '1m', target: 3000}, // Mantén 10 usuarios durante 10 segundos
//       { duration: '30s', target: 0 },  // Luego baja a 0 usuarios al final
//     ],
//     thresholds: {
//       // Aseguramos que el 95% de las respuestas no tarden más de 1 segundo
//       http_req_duration: ['p(95)<1000'], // 95% de las peticiones deben ser menores a 1000ms
//       'errors': ['rate<0.01'], // Menos del 1% de errores
//     },
//   };

export default function () {
  const idRefrigerador = '1';
  const url = `http://localhost:3000/api/refrigeradores/${idRefrigerador}/otp`;  //TODO: AGREGARLE AUTH

  const res = http.post(url, null, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'response status was 200': (r) => r.status === 200,
    'meets response time': (r) => r.timings.duration < 1000,
  })|| errorRate.add(1);

  sleep(1);
}
