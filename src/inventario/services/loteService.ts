import { LoteRepository } from '../repositories/loteRepository';
import { LoteDTO, LoteUpdateRetiroDto } from '../dto/LoteDto';
import { Lote } from '../../shared/models/lote';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError, InvalidValueError } from '../../shared/utils/customErrors';
import { ProductoEnvasado } from '../../shared/models/productoEnvasado';
import { publishLoteNotification } from '../queues/cocinaPublisher';

const loteRepository = new LoteRepository();

export const getAllLotes = async (): Promise<Lote[]> => {
    try {
        return await loteRepository.findAll();
    } catch (error: any) {
        throw new DatabaseError(`Error al obtener lotes: ${error.message}`);
    }
};

export const getLoteById = async (id: number): Promise<Lote | null> => {
    if (!id) throw new MissingParameterError('El ID del lote es requerido');
    try {
        const lote = await loteRepository.findById(id);
        if (!lote) 
            throw new NotFoundError(`El lote con ID ${id} no se encuentra en la base de datos`);
        return lote;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener lote con ID ${id}: ${error.message}`);
    }
};

export const createLote = async (loteDto: LoteDTO): Promise<{ lote: Lote, productosEnvasados: ProductoEnvasado[] }> => {
    if (Object.keys(loteDto).length === 0) {
        throw new MissingParameterError("El LoteDTO es requerido");
    }
    if (!loteDto.id_cocina || !loteDto.id_local_destino || !loteDto.id_producto) {
        throw new RequiredFieldError("Los campos 'id_cocina', 'id_local_destino' y 'id_producto' son obligatorios en LoteDTO");
    }
    try {
        const lote = await loteRepository.create(loteDto);
        if (!lote) 
            throw new NotFoundError("No existe la cocina, local, producto o refrigerador en la base de datos");
        await publishLoteNotification(lote.lote);
        return lote;
    } catch (error: any) {
        if (error instanceof NotFoundError) 
            throw error;
        throw new DatabaseError(`Error al crear lote: ${error.message}`);
    }
};



export const updateRetiroLote = async (id: number): Promise<Lote | null> => {
    if (!id)
        throw new MissingParameterError('El ID del lote es requerido');
    try {
        const lote = await loteRepository.updateRetiro(id);
        if (!lote) 
            throw new NotFoundError(`El lote a marcar como retirado con ID ${id} no se encuentra en la base de datos`);
        return lote;
    } catch (error: any) {
        if (error instanceof NotFoundError || error instanceof InvalidValueError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener lote con ID ${id}: ${error.message}`);
    }
};

export const updateEntregaLote = async (id: number): Promise<Lote | null> => {
    if (!id)
        throw new MissingParameterError('El ID es requerido');
    try {
        const lote = await loteRepository.updateEntrega(id);
        if (!lote) 
            throw new NotFoundError(`El lote a marcar como entregado con ID ${id} no se encuentra en la base de datos`);
        return lote;
    } catch (error: any) {
        if (error instanceof NotFoundError || error instanceof InvalidValueError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener lote con ID ${id}: ${error.message}`);
    }
};


export const deleteLote = async (id: number): Promise<void> => {
    if (!id) throw new MissingParameterError('El ID del lote es requerido');
    try {
        const filasEliminadas = await loteRepository.delete(id);
        if (filasEliminadas === 0) throw new NotFoundError(`El lote a eliminar con ID ${id} no se encuentra en la base de datos`);
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al eliminar lote con ID ${id}: ${error.message}`);
    }
};
