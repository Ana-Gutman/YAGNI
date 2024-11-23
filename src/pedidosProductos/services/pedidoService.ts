import { PedidoRepository } from '../repositories/pedidoRepository';
import { PedidoDTO } from '../dto/PedidoDto';
import { Pedido } from '../../shared/models/pedido';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError, InvalidValueError } from '../../shared/utils/customErrors';
import { ProductoPedidoDTO } from '../dto/ProductoPedidoDto';
import { LocalRepository } from '../../inventario/repositories/localRepository';
import { publishPedidoNotification } from '../../inventario/queues/localPublisher';
import { ListaPedidoDTO, ListaPedidosDeClienteDto } from '../dto/ListaPedidoDto';
import { Op } from 'sequelize';
import { Cliente } from '../../shared/models/cliente';
import { ProductoPedido } from '../../shared/models/productoPedido';
import { ProductoRefrigerador } from '../../shared/models/productoRefrigerador';
import { Refrigerador } from '../../shared/models/refrigerador';
import { Producto } from '../../shared/models/producto';

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

export const marcarPedidoIncompleto = async (idPedido: number, productos: ProductoPedidoDTO[]): Promise<string> => {
    const pedido = await Pedido.findByPk(idPedido);

    if (!pedido) {
        throw new NotFoundError("Pedido no encontrado.");
    }

    // Obtener los productos del pedido utilizando `getProductoPedidos`
    const productosPedido = await pedido.getProductoPedidos();

    for (const producto of productos) {
        const productoPedido = productosPedido.find(
            (p: any) => p.id_producto === producto.id_producto
        );

        if (!productoPedido || productoPedido.cantidad > producto.cantidad) {
            // Actualiza el estado del pedido como incompleto
            pedido.estado = "Incompleto";
            await pedido.save();
            return "Pedido marcado como incompleto: Stock insuficiente.";
        }
    }

    return "No se pudo marcar como incompleto. Stock suficiente.";
};


export const completarPedido = async (idPedido: number): Promise<void> => {
    const pedido = await pedidoRepository.findById(idPedido);
    if (!pedido) {
        throw new NotFoundError('Pedido no encontrado.');
    }

    pedido.estado = 'Completo';
    await pedido.save();
};

export const getPedidosConRefrigeradores = async (idCliente: number) => {
    const pedidos = await Pedido.findAll({
        where: { id_cliente: idCliente },
        include: [
            {
                model: ProductoPedido,
                attributes: ["id_producto", "cantidad"],
                include: [
                    {
                        model: Producto,
                        attributes: ["id_producto", "nombre"],
                        include: [
                            {
                                model: ProductoRefrigerador,
                                attributes: ["id_refrigerador", "cantidad"],
                                include: [
                                    {
                                        model: Refrigerador,
                                        attributes: ["id_refrigerador", "marca_nombre"],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    });

    return pedidos.map((pedido: any) => ({
        id_pedido: pedido.id_pedido,
        productos: pedido.ProductoPedidos.map((producto: any) => ({
            id_producto: producto.id_producto,
            cantidad: producto.cantidad,
            refrigerador: producto.Producto.ProductoRefrigeradors?.map((pr: any) => pr.Refrigerador) || null,
        })),
    }));
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
        const { id_cliente, fechaInicio, fechaFin, estado } = listaPedidoCli;
        if (!id_cliente || !fechaInicio || !fechaFin) {
            console.log(id_cliente, fechaInicio, fechaFin);
            throw new MissingParameterError('Los parámetros id_cliente, fechaInicio y fechaFin son requeridos');
        }
        if (estado && estado !== 'Completo' && estado !== 'Incompleto') {
            throw new InvalidValueError("estado", estado ,'El estado debe ser Completo o Incompleto');
        }
        const pedidos = await pedidoRepository.listarPedidosPorClienteYPeriodo(id_cliente, fechaInicio, fechaFin, estado);
        return pedidos;
    }
    catch (error: any) {
        if (error instanceof MissingParameterError || error instanceof InvalidValueError) {
            throw error;
        }
        throw new DatabaseError(`Error al listar pedidos: ${error.message}`);
    }
    
  }

export const updatePedidoRetirado = async (id: number, estado: string): Promise<Pedido | null> => {
    if (!id)
        throw new MissingParameterError('El ID y es requerido');
    console.log("estado", estado);
    if (!estado || estado === '{}') throw new RequiredFieldError("El campo 'estado' es obligatorio");
    if (estado !== 'Completo' && estado !== 'Incompleto') throw new InvalidValueError("estado", estado, 'El estado debe ser Completo o Incompleto');
    try {
        const pedido = await pedidoRepository.updateRetirado(id, estado);
        if (!pedido) 
            throw new NotFoundError(`El pedido a marcar como retirado con ID ${id} no se encuentra en la base de datos`);
        return pedido;
    } catch (error: any) {
        if (error instanceof NotFoundError || error instanceof InvalidValueError || error instanceof MissingParameterError 
            || error instanceof RequiredFieldError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener pedido con ID ${id}: ${error.message}`);
    }
}
