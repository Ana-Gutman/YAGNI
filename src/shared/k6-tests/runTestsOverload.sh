#!/bin/bash
echo "Running tests in overload mode..."

# Modifica las opciones dentro de cada script para reflejar la carga sobrecargada (target: 8000).
k6 run tests/listarExistencias.js
k6 run tests/listarPedidosCliente.js
k6 run tests/getProductState.js
k6 run tests/listarPedidosEstado.js
k6 run tests/crearPedido.js

echo "Overload mode tests completed."
