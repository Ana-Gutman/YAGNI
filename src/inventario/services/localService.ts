import { LocalRepository } from '../repositories/localRepository';
import { LocalDTO } from '../dto/LocalDto';
import { Local } from '../../shared/models/local';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError } from '../../shared/errors';

const localRepository = new LocalRepository();

export const getAllLocales = async (): Promise<Local[]> => {
    try {
        return await localRepository.findAll();
    } catch (error:any) {
        throw new DatabaseError(`Error al obtener locales: ${error.message}`);
    }
};

export const getLocalById = async (id: number): Promise<Local | null> => {
    if (!id) throw new MissingParameterError('El ID del local es requerido');
    try {
        const local = await localRepository.findById(id);
        if (!local) 
            throw new NotFoundError(`El local con ID ${id} no se encuentra en la base de datos`);
        return local;
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener local con ID ${id}: ${error.message}`);
    }
};

export const createLocal = async (localDto: LocalDTO): Promise<Local> => {
    if (!localDto) {
        throw new MissingParameterError("LocalDTO es nulo o faltan campos obligatorios");
    }
    if (!localDto.nombre || !localDto.direccion) {
        throw new RequiredFieldError("Los campos 'nombre' y 'direccion' son obligatorios en LocalDTO");
    }
    try {
        const local = await localRepository.create(localDto);
        if (!local) 
            throw new DatabaseError("Error al crear el local");
        return local;
    } catch (error:any) {
        throw new DatabaseError(`Error al crear local: ${error.message}`);
    }
};

export const updateLocal = async (id: number, localDto: LocalDTO): Promise<Local | null> => {
    if (!id || !localDto) 
        throw new MissingParameterError('El ID y LocalDTO son requeridos');
    if (!localDto.nombre || !localDto.direccion) {
        throw new RequiredFieldError("Los campos 'nombre' y 'direccion' son obligatorios en LocalDTO");
    }
    try {
        const local = await localRepository.update(id, localDto);
        if (!local) 
            throw new NotFoundError(`El local a modificar con ID ${id} no se encuentra en la base de datos`);
        return local;
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener local con ID ${id}: ${error.message}`);
    }
};

export const deleteLocal= async (id: number): Promise<void> => {
    if (!id) throw new MissingParameterError('El ID del local es requerido');
    try {
        const filasEliminadas = await localRepository.delete(id);
        if (filasEliminadas === 0) throw new NotFoundError(`El local a eliminar con ID ${id} no se encuentra en la base de datos`);
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al eliminar local con ID ${id}: ${error.message}`);
    }
};
