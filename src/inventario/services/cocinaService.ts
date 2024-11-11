import { CocinaRepository } from '../repositories/cocinaRepository';
import { CocinaDTO } from '../dto/CocinaDto';
import { Cocina } from '../../shared/models/cocina';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError } from '../../shared/errors';

const cocinaRepository = new CocinaRepository();

export const getAllCocinas = async (): Promise<Cocina[]> => {
    try {
        return await cocinaRepository.findAll();
    } catch (error:any) {
        throw new DatabaseError(`Error al obtener cocinas: ${error.message}`);
    }
};

export const getCocinaById = async (id: number): Promise<Cocina | null> => {
    if (!id) throw new MissingParameterError('El ID de la cocina es requerido');
    try {
        const cocina = await cocinaRepository.findById(id);
        if (!cocina) 
            throw new NotFoundError(`La cocina con ID ${id} no se encuentra en la base de datos`);
        return cocina;
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener cocina con ID ${id}: ${error.message}`);
    }
};

export const createCocina = async (cocinaDto: CocinaDTO): Promise<Cocina> => {
    if (Object.keys(cocinaDto).length === 0) {
        throw new MissingParameterError("El CocinaDTO es requerido");
    }
    if (!cocinaDto.direccion) {
        throw new RequiredFieldError("El campo 'direccion' es obligatorio en CocinaDTO");
    }
    try {
        const cocina = await cocinaRepository.create(cocinaDto);
        if (!cocina) 
            throw new DatabaseError("Error al crear la cocina");
        return cocina;
    } catch (error:any) {
        throw new DatabaseError(`Error al crear cocina: ${error.message}`);
    }
};

export const updateCocina = async (id: number, cocinaDto: CocinaDTO): Promise<Cocina | null> => {
    if (!id || Object.keys(cocinaDto).length === 0) 
        throw new MissingParameterError('El ID y CocinaDTO son requeridos');
    if (!cocinaDto.direccion) {
        throw new RequiredFieldError("El campo 'direccion' es obligatorio en CocinaDTO");
    }
    try {
        const cocina = await cocinaRepository.update(id, cocinaDto);
        if (!cocina) 
            throw new NotFoundError(`La cocina a modificar con ID ${id} no se encuentra en la base de datos`);
        return cocina;
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener cocina con ID ${id}: ${error.message}`);
    }
};

export const deleteCocina = async (id: number): Promise<void> => {
    if (!id) throw new MissingParameterError('El ID de la cocina es requerido');
    try {
        const filasEliminadas = await cocinaRepository.delete(id);
        if (filasEliminadas === 0) throw new NotFoundError(`La cocina a eliminar con ID ${id} no se encuentra en la base de datos`);
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al eliminar cocina con ID ${id}: ${error.message}`);
    }
};
