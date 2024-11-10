import pedidoQueue from '../shared/queues/pedidoQueue';

export const agregarPedido = async (pedido: any) => {
  await pedidoQueue.add(pedido);
  console.log(`Pedido agregado a la cola: ${JSON.stringify(pedido)}`);
};
