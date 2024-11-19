import pedidoQueue from '../shared/config/pedidoQueue';

export const agregarPedido = async (pedido: any) => {
  await pedidoQueue.add(pedido);
  console.log(`Pedido agregado a la cola: ${JSON.stringify(pedido)}`);
};
