import http from "k6/http";
import { check } from "k6";
import { Rate } from 'k6/metrics';
let errorRate = new Rate('errors');
export const options = {
  stages: [
    { duration: "30s", target: 3000 }, // Modo normal
    { duration: "1m", target: 3000 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<600"], // 95% de las solicitudes deben ser menores a 600 ms
    errors: ['rate<0.01'],
  },
};

// export const options = {
//     stages: [
//       { duration: "30s", target: 8000 }, // Modo sobrecargado
//       { duration: "1m", target: 8000 },
//       { duration: "30s", target: 0 },
//     ],
//     thresholds: {
//       http_req_duration: ["p(95)<600"], // 95% de las solicitudes deben ser menores a 600 ms
//     },
//   };
  

export default function () {
  const url = "http://localhost:3000/api/pedidos"; 
  const payload = JSON.stringify({
    id_cliente: "1",
    id_medio_pago: "1",
    id_local: "5",
    hora_de_retiro: "2024-12-31T12:00:00Z",
    productos: [
      { id_producto: "1", cantidad: 100 },
      { id_producto: "2", cantidad: 10 },
    ],
  });


  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sIjoiQWRtaW4iLCJpYXQiOjE3MzI0MTc1NzQsImV4cCI6MTczMjQyMTE3NH0.Y1N8Lq3483lCVdVi3v2otM_QKZBk05wqnd0kX0GCuVQ", // Reemplazar con un token válido
    },
  };

  const res = http.post(url, payload, params);
  //agrega idemtifcador que funcion esta probando

  check(res, {
    
    "status is 200": (r) => r.status === 200,
    "response time < 600ms": (r) => r.timings.duration < 600,
  })|| errorRate.add(1);
}
