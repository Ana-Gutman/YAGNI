import { Cliente } from "../../shared/models/cliente";
import { ClienteDTO } from "../dto/ClienteDto";

// interface ClienteFilter {

// }

class ClienteRepository {
    async findAll(): Promise<Cliente[]> {
        return Cliente.findAll();
    }

    async findById(id: number): Promise<Cliente | null> {
        return await Cliente.findByPk(id);
    }

    async create(clienteDto: ClienteDTO): Promise<Cliente> {
        const cliente = { ...clienteDto };
        return Cliente.create(cliente);
    }

    async update(id: number, clienteDto: ClienteDTO): Promise<Cliente | null> {
        await Cliente.update(clienteDto, {
            where: { id_cliente: id },
        });
        return this.findById(id);
    }

    async delete(id: number): Promise<number> {
        return Cliente.destroy({
            where: { id_cliente: id },
        });
    }
}

export { ClienteRepository };
