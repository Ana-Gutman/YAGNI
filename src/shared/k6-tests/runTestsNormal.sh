#!/bin/bash
echo "Running tests in normal mode..."

k6 run tests/listarExistencias.js
k6 run tests/listarPedidosCliente.js
k6 run tests/getProductState.js
k6 run tests/listarPedidosEstado.js
k6 run tests/crearPedido.js
k6 run tests/createOTP.js

echo "Normal mode tests completed."
