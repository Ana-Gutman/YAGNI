import { ClienteRepository } from '../repositories/clienteRepository';
import { ClienteDTO } from '../dto/ClienteDto';
import { Cliente } from '../../shared/models/cliente';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError } from '../../shared/utils/customErrors';
import { MedioPago } from '../../shared/models/medioPago';

const clienteRepository = new ClienteRepository();

export const getAllClientes = async (): Promise<Cliente[]> => {
    try {
        return await clienteRepository.findAll();
    } catch (error: any) {
        throw new DatabaseError(`Error al obtener clientes: ${error.message}`);
    }
};

export const getClienteById = async (id: number): Promise<Cliente | null> => {
    if (!id) throw new MissingParameterError('El ID del cliente es requerido');
    try {
        const cliente = await clienteRepository.findById(id);
        if (!cliente)
            throw new NotFoundError(`El cliente con ID ${id} no se encuentra en la base de datos`);
        return cliente;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al obtener cliente con ID ${id}: ${error.message}`);
    }
};

export const createCliente = async (clienteDto: ClienteDTO): Promise<Cliente> => {
    if (Object.keys(clienteDto).length === 0) {
        throw new MissingParameterError("El ClienteDTO es es requerido");
    }
    if (!clienteDto.id_usuario || !clienteDto.celular || !clienteDto.mediosDePago) {
        throw new RequiredFieldError("El campos 'id_usuario', 'medios de pago' y 'celular' son obligatorios en ClienteDTO");
    }
    if (clienteDto.mediosDePago.length === 0) {
        throw new RequiredFieldError("El campo 'medios de pago' no puede estar vacío");
    }
    const mediosPagoCliente = [];
    for (const medioPagoId of clienteDto.mediosDePago) {
        const medioPago = await clienteRepository.findMedioPagoById(medioPagoId);
        if (!medioPago) {
            throw new NotFoundError(`Medio de pago con ID ${medioPagoId} no encontrado`);
        }
        mediosPagoCliente.push(medioPago);
    }
    try {
        const cliente = await clienteRepository.create(clienteDto);
        if (!cliente)
            throw new DatabaseError("Error al crear el cliente");
        for (const medioPago of mediosPagoCliente) {
            await clienteRepository.addMedioPagoToCliente(cliente,  medioPago);
        }
        return cliente;
    } catch (error: any) {
        throw new DatabaseError(`Error al crear cliente: ${error.message}`);
    }
};

export const updateCliente = async (id: number, clienteDto: ClienteDTO): Promise<Cliente | null> => {
    if (!id || Object.keys(clienteDto).length === 0)
        throw new MissingParameterError('El ID y ClienteDTO son requeridos');
    if (!clienteDto.id_usuario || !clienteDto.celular || !clienteDto.mediosDePago) {
        throw new RequiredFieldError("El campos 'id_usuario', 'medios de pago' y 'celular' son obligatorios en ClienteDTO");
    }
    if (clienteDto.mediosDePago.length === 0) {
        throw new RequiredFieldError("El campo 'medios de pago' no puede estar vacío");
    }
    try {
        const cliente = await clienteRepository.update(id, clienteDto);
        if (!cliente)
            throw new NotFoundError(`El cliente a modificar con ID ${id} no se encuentra en la base de datos`);
        return cliente;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al obtener cliente con ID ${id}: ${error.message}`);
    }
};

export const deleteCliente = async (id: number): Promise<void> => {
    if (!id) throw new MissingParameterError('El ID del cliente es requerido');
    try {
        const filasEliminadas = await clienteRepository.delete(id);
        if (filasEliminadas === 0) throw new NotFoundError(`El cliente a eliminar con ID ${id} no se encuentra en la base de datos`);
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al eliminar cliente con ID ${id}: ${error.message}`);
    }
};

export const addMedioPagoToCliente = async (clienteId: number, medioPagoId: number): Promise<void> => {
    if (!clienteId || !medioPagoId) {
        throw new MissingParameterError('Los IDs del cliente y del medio de pago son requeridos');
    }
    const cliente = await clienteRepository.findById(clienteId);
    if (!cliente) {
        throw new NotFoundError(`Cliente con ID ${clienteId} no encontrado`);
    }

    const medioPago = await clienteRepository.findMedioPagoById(medioPagoId);
    if (!medioPago) {
        throw new NotFoundError(`Medio de pago con ID ${medioPagoId} no encontrado`);
    }

    await clienteRepository.addMedioPagoToCliente(cliente, medioPago); 
};


export const getAllMediosPago = async (): Promise<MedioPago[]> => {
    try {
        return await clienteRepository.findAllMediosPago();
    } catch (error: any) {
        throw new DatabaseError(`Error al obtener medios de pago: ${error.message}`);
    }
}
