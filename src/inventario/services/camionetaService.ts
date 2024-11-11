import { CamionetaRepository } from '../repositories/camionetaRepository';
import { CamionetaDTO } from '../dto/CamionetaDto';
import { Camioneta } from '../../shared/models/camioneta';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError } from '../../shared/errors';

const camionetaRepository = new CamionetaRepository();

export const getAllCamionetas = async (): Promise<Camioneta[]> => {
    try {
        return await camionetaRepository.findAll();
    } catch (error:any) {
        throw new DatabaseError(`Error al obtener camionetas: ${error.message}`);
    }
};

export const getCamionetaById = async (id: number): Promise<Camioneta | null> => {
    if (!id) throw new MissingParameterError('El ID de la camioneta es requerido');
    try {
        const camioneta = await camionetaRepository.findById(id);
        if (!camioneta) 
            throw new NotFoundError(`La camioneta con ID ${id} no se encuentra en la base de datos`);
        return camioneta;
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener camioneta con ID ${id}: ${error.message}`);
    }
};

export const createCamioneta = async (camionetaDto: CamionetaDTO): Promise<Camioneta> => {
    if (Object.keys(camionetaDto).length === 0) {
        throw new MissingParameterError("El CamionetaDTO es requerido");
    }
    if (!camionetaDto.matricula) {
        throw new RequiredFieldError("El campo 'matricula' es obligatorio en CamionetaDTO");
    }
    try {
        const camioneta = await camionetaRepository.create(camionetaDto);
        if (!camioneta) 
            throw new DatabaseError("Error al crear la camioneta");
        return camioneta;
    } catch (error:any) {
        throw new DatabaseError(`Error al crear camioneta: ${error.message}`);
    }
};

export const updateCamioneta = async (id: number, camionetaDto: CamionetaDTO): Promise<Camioneta | null> => {
    if (!id || Object.keys(camionetaDto).length === 0)
        throw new MissingParameterError('El ID y CamionetaDTO son requeridos');
    if (!camionetaDto.matricula) {
        throw new RequiredFieldError("El campo 'matricula' es obligatorio en CamionetaDTO");
    }
    try {
        const camioneta = await camionetaRepository.update(id, camionetaDto);
        if (!camioneta) 
            throw new NotFoundError(`La camioneta a modificar con ID ${id} no se encuentra en la base de datos`);
        return camioneta;
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener camioneta con ID ${id}: ${error.message}`);
    }
};

export const deleteCamioneta = async (id: number): Promise<void> => {
    if (!id) throw new MissingParameterError('El ID de la camioneta es requerido');
    try {
        const filasEliminadas = await camionetaRepository.delete(id);
        if (filasEliminadas === 0) throw new NotFoundError(`La camioneta a eliminar con ID ${id} no se encuentra en la base de datos`);
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al eliminar camioneta con ID ${id}: ${error.message}`);
    }
};
