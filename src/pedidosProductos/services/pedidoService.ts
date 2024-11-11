import { PedidoRepository } from '../repositories/pedidoRepository';
import { PedidoDTO } from '../dto/PedidoDto';
import { Pedido } from '../../shared/models/pedido';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError } from '../../shared/errors';

const pedidoRepository = new PedidoRepository();

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

export const createPedido = async (pedidoDto: PedidoDTO): Promise<Pedido> => {
    if (Object.keys(pedidoDto).length === 0) {
        throw new MissingParameterError("El PedidoDTO es requerido");
    }
    if (!pedidoDto.id_cliente || !pedidoDto.id_medio_pago || !pedidoDto.id_local) {
        throw new RequiredFieldError("Los campos 'id_cliente', 'id_medio_pago' e 'id_local' son obligatorios en PedidoDTO");
    }
    try {
        const pedido = await pedidoRepository.create(pedidoDto);
        if (!pedido) 
            throw new NotFoundError("El cliente, medio de pago o local no existe en la base de datos");
        return pedido;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al crear pedido: ${error.message}`);
    }
};
