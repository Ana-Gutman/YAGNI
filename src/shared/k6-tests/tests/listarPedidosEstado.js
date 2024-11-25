import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

let errorRate = new Rate('errors');
export const options = {
  stages: [
    { duration: '30s', target: 3000 }, // Modo normal
    { duration: '1m', target: 3000 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% < 500ms en modo normal
    errors: ['rate<0.01'],
  },
};
// export const options = {
//   stages: [
//     { duration: '30s', target: 8000 }, // Modo sobrecargado
//     { duration: '1m', target: 8000 },
//     { duration: '30s', target: 0 },
//   ],
//   thresholds: {
//     http_req_duration: ['p(95)<1000'], // 95% < 1s en modo sobrecargado
//   },
// };
export default function () {
  const url = 'http://localhost:3000/api/pedidos/estado';
  const payload = JSON.stringify({
    id_cliente: '1',
    fechaInicio: '2024-01-01',
    fechaFin: '2024-01-31',
  });
  const params = { headers: { 'Content-Type': 'application/json',
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sIjoiQWRtaW4iLCJpYXQiOjE3MzI0MTc1NzQsImV4cCI6MTczMjQyMTE3NH0.Y1N8Lq3483lCVdVi3v2otM_QKZBk05wqnd0kX0GCuVQ"
   } };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'meets response time': (r) => r.timings.duration < 500,
  })|| errorRate.add(1);
}
