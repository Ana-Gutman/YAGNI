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
    paymentData: {
      amount: 10,
      currency: "USD",
      method: "credit_card",  
      details:{
        card_number: "4111111111111111",
        expiryDate: "12/23",
        cvv: "123"
      }
    }
  });


  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc5LCJyb2wiOiJBZG1pbiIsImlhdCI6MTczMjU0MTc4MSwiZXhwIjoxNzMyNTQ1MzgxfQ.WKdhkUQXkHCsiHEkem1oxOeKuwwFnrZXAAV9KAkgpvU", // Reemplazar con un token válido
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 201": (r) => r.status === 201,
    "response time < 600ms": (r) => r.timings.duration < 600,
  })|| errorRate.add(1);
}
