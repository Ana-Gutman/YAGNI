import { PedidoRepository } from '../repositories/pedidoRepository';
import { PedidoDTO } from '../dto/PedidoDto';
import { Pedido } from '../../shared/models/pedido';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError } from '../../shared/errors/customErrors';
import { ProductoPedidoDTO } from '../dto/ProductoPedidoDto';
import { LocalRepository } from '../../inventario/repositories/localRepository';
import { publishPedidoNotification } from '../../inventario/queues/localPublisher';
import { ListaPedidoDTO, ListaPedidosDeClienteDto } from '../dto/ListaPedidoDto';
import { Op } from 'sequelize';
import { Cliente } from '../../shared/models/cliente';

const pedidoRepository = new PedidoRepository();
const localRepository = new LocalRepository();

export const getAllPedidos = async (): Promise<Pedido[]> => {
    try {
        return await pedidoRepository.findAll();
    } catch (error: any) {
        throw new DatabaseError(`Error al obtener pedidos: ${error.message}`);
    }
};

export const getPedidoById = async (id: number): Promise<Pedido | null> => {
    if (!id) throw new MissingParameterError('El ID del pedido es requerido');
    try {
        const pedido = await pedidoRepository.findById(id);
        if (!pedido) 
            throw new NotFoundError(`El pedido con ID ${id} no se encuentra en la base de datos`);
        return pedido;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener pedido con ID ${id}: ${error.message}`);
    }
};



export const createPedido = async (pedidoDto: PedidoDTO): Promise<{ pedido: Pedido, productosPedido: ProductoPedidoDTO[] }> => {
    if (Object.keys(pedidoDto).length === 0) {
        throw new MissingParameterError("El PedidoDTO es requerido");
    }
    if (!pedidoDto.id_cliente || !pedidoDto.id_medio_pago || !pedidoDto.id_local || !pedidoDto.productos) {
        throw new RequiredFieldError("Los campos 'id_cliente', 'id_medio_pago', 'id_local', y 'productos' son obligatorios en PedidoDTO");
    }
    try {
        const pedido = await pedidoRepository.create(pedidoDto);
        if (!pedido) 
            throw new NotFoundError("El cliente, medio de pago, local o productos no existen en la base de datos");
        const pedidoALocal = await getPedidoACocina(pedido.pedido, pedido.productosPedido);
        await publishPedidoNotification( pedidoALocal,  pedidoDto.id_local);
        return pedido;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al crear pedido: ${error.message}`);
    }
};

export const getPedidoACocina = async (pedido: Pedido, productosPedido: ProductoPedidoDTO[]): Promise<{
    id_producto: number;
    cantidad: number;
    }[]> => {
        const stock = await localRepository.getStockDeProducto(pedido.id_local, productosPedido[0].id_producto);
    return productosPedido.map(producto => ({
        id_producto: producto.id_producto, 
        cantidad: producto.cantidad - stock
    }));
}

export const listarPedidosPorClienteYPeriodo = async (listaPedidoCli: ListaPedidosDeClienteDto): Promise<ListaPedidoDTO[]> => {
    try{
        const { id_cliente, fechaInicio, fechaFin } = listaPedidoCli;
        if (!id_cliente || !fechaInicio || !fechaFin) {
            console.log(id_cliente, fechaInicio, fechaFin);
            throw new MissingParameterError('Los parámetros id_cliente, fechaInicio y fechaFin son requeridos');
        }
        const pedidos = await pedidoRepository.listarPedidosPorClienteYPeriodo(id_cliente, fechaInicio, fechaFin);
        return pedidos;
    }
    catch (error: any) {
        if (error instanceof MissingParameterError) {
            throw error;
        }
        throw new DatabaseError(`Error al listar pedidos: ${error.message}`);
    }
    
  }