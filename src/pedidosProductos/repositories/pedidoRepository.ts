import { Cliente } from "../../shared/models/cliente";
import { Local } from "../../shared/models/local";
import { MedioPago } from "../../shared/models/medioPago";
import { Pedido } from "../../shared/models/pedido";
import { PedidoDTO } from "../dto/PedidoDto";

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
        pedidoDto.estado = "Iniciado";
        const pedido = { ...pedidoDto };
        const cliente = await Cliente.findByPk(pedidoDto.id_cliente);
        const medioPago = await MedioPago.findByPk(pedidoDto.id_medio_pago);
        const local = await Local.findByPk(pedidoDto.id_local);
        if (!cliente || !medioPago || !local) {
            return null;
        }
        return Pedido.create(pedido);  
    }
}

export { PedidoRepository };
