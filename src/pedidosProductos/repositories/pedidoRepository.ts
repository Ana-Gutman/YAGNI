import { Transaction } from "sequelize";
import sequelize from "../../shared/database/database";
import { Cliente } from "../../shared/models/cliente";
import { Local } from "../../shared/models/local";
import { MedioPago } from "../../shared/models/medioPago";
import { Pedido } from "../../shared/models/pedido";
import { Producto } from "../../shared/models/producto";
import { PedidoDTO } from "../dto/PedidoDto";
import { ProductoPedido } from "../../shared/models/productoPedido";
import { ProductoPedidoDTO } from "../dto/ProductoPedidoDto";

// interface PedidoFilter {
// }

class PedidoRepository {
    async findAll(): Promise<Pedido[]> {
        return Pedido.findAll();
    }
  
    async findById(id: number): Promise<Pedido | null> {
        return await Pedido.findByPk(id);
    }
  
    async create(pedidoDto: PedidoDTO): Promise<Pedido | null> {
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

            const pedido = await Pedido.create({ id_cliente, id_medio_pago, id_local, estado: pedidoDto.estado }, { transaction });

            const productosEnPedido = productos.map((producto) => ({
                id_pedido: pedido.id_pedido,
                id_producto: producto.id_producto,
                cantidad: producto.cantidad,
            }));
            await ProductoPedido.bulkCreate(productosEnPedido, { transaction });

            await transaction.commit();
            return pedido;
        } catch (error:any) {
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

    async checkProductExistence(products: ProductoPedidoDTO[], transaction:Transaction): Promise<boolean> {
        const productoIds = products.map((producto) => producto.id_producto);
        const productosExistentes = await Producto.findAll({
            where: { id_producto: productoIds },
            attributes: ['id_producto'],
            transaction
        });

        return (productosExistentes.length === productoIds.length);
    }


}

export { PedidoRepository };
