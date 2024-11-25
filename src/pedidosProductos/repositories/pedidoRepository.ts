import { Op, Transaction } from "sequelize";
import sequelize from "../../shared/database/database";
import { Cliente } from "../../shared/models/cliente";
import { Local } from "../../shared/models/local";
import { MedioPago } from "../../shared/models/medioPago";
import { Pedido } from "../../shared/models/pedido";
import { Producto } from "../../shared/models/producto";
import { PedidoDTO } from "../dto/PedidoDto";
import { ProductoPedido } from "../../shared/models/productoPedido";
import { ProductoPedidoDTO } from "../dto/ProductoPedidoDto";
import { ListaPedidoDTO } from "../dto/ListaPedidoDto";
import { NotFoundError } from "../../shared/utils/customErrors";
import { Usuario } from "../../shared/models/usuario";


class PedidoRepository {

    async findAll(): Promise<Pedido[]> {
        return Pedido.findAll();
    }

    async findById(id: number): Promise<Pedido | null> {
        return await Pedido.findByPk(id);
    }


    async verificarPedidoIncompleto(idPedido: number, productos: ProductoPedidoDTO[]): Promise<boolean> {
        const pedido = await Pedido.findByPk(idPedido);
        
        if (!pedido) {
            throw new NotFoundError(`El pedido con ID ${idPedido} no se encuentra en la base de datos.`);
        }
    
        const productosEnPedido = await pedido.getProductoPedidos();
    
        for (const producto of productos) {
            const productoEnPedido = productosEnPedido.find(
                (p) => p.id_producto === producto.id_producto
            );
            if (!productoEnPedido || producto.cantidad < productoEnPedido.cantidad) {
                return true; 
            }
        }
        return false; 
    }
    
    
    async marcarPedidoIncompleto(idPedido: number): Promise<void> {
        const pedido = await Pedido.findByPk(idPedido);
        if (!pedido) {
            throw new NotFoundError(`El pedido con ID ${idPedido} no se encuentra en la base de datos.`);
        }
    
        pedido.estado = 'Incompleto';
        await pedido.save();
    }
    
    
    async create(pedidoDto: PedidoDTO): Promise<{ pedido: Pedido, productosPedido: ProductoPedidoDTO[] } | null> {
        const transaction = await sequelize.transaction();
        try {
            pedidoDto.estado = "Iniciado";

            const { id_cliente, id_medio_pago, id_local, productos } = pedidoDto;

            const exsistence = await this.checkExistence(id_cliente, id_local, id_medio_pago);
            const productsExistence = exsistence && await this.checkProductExistence(productos, transaction);
            if (!exsistence || !productsExistence) {
                await transaction.rollback();
                return null;
            }

            const pedido = await Pedido.create({ id_cliente, id_medio_pago, id_local, estado: pedidoDto.estado, hora_de_retiro: pedidoDto.hora_de_retiro }, { transaction });
            const productosEnPedido = productos.map((producto) => ({
                id_pedido: pedido.id_pedido,
                id_producto: producto.id_producto,
                cantidad: producto.cantidad,
            }));
            await ProductoPedido.bulkCreate(productosEnPedido, { transaction });
            await transaction.commit();

            return { pedido: pedido, productosPedido: pedidoDto.productos };
        } catch (error: any) {
            await transaction.rollback();
            throw new Error(`Error al crear el pedido: ${error.message}`);
        }
    }

    async checkExistence(id_cliente: number, id_local: number, id_medio_pago: number): Promise<boolean> {
        const cliente = await Cliente.findByPk(id_cliente);
        const local = await Local.findByPk(id_local);
        const medioPago = await MedioPago.findByPk(id_medio_pago);

        if (!cliente || !local || !medioPago) {
            return false;
        }
        return true;
    }

    async checkProductExistence(products: ProductoPedidoDTO[], transaction: Transaction): Promise<boolean> {
        const productoIds = products.map((producto) => producto.id_producto);
        const productosExistentes = await Producto.findAll({
            where: { id_producto: productoIds },
            attributes: ['id_producto'],
            transaction
        });

        return (productosExistentes.length === productoIds.length);
    }
    async listarPedidosPorClienteYPeriodo(
        id_cliente: number,
        fechaInicio: Date,
        fechaFin: Date,
        estado?: string
    ): Promise<Pedido[]> {
        const whereCondition: any = {
            id_cliente,
            createdAt: {
                [Op.gte]: fechaInicio, 
                [Op.lte]: fechaFin,    
            },
        };
    
        if (estado) {
            whereCondition.estado = estado;
        }
    
        return Pedido.findAll({
            where: whereCondition,
            include: [
                {
                    model: Cliente,
                    include: [
                        {
                            model: Usuario, 
                            attributes: ['nombre'], 
                        },
                    ],
                    attributes: ['id_cliente'], 
                },
            ],
            attributes: ['id_pedido', 'id_cliente', 'estado', 'createdAt', 'retirado'], 
            order: [['createdAt', 'ASC']],
        });
    }
    
    async updateRetirado(id: number, estado: 'Completo' | 'Incompleto'): Promise<Pedido | null> {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return null;
        }
        pedido.estado = estado;
        pedido.retirado = new Date();
        await pedido.save();
        return pedido;
    }


}

export { PedidoRepository };
