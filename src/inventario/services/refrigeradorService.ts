import { RefrigeradorRepository } from '../repositories/refrigeradorRepository';
import { RefrigeradorDTO } from '../dto/RefrigeradorDto';
import { Refrigerador } from '../../shared/models/refrigerador';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError, InvalidValueError } from '../../shared/errors/customErrors';
import { MarcaRefrigerador } from '../../shared/models/marcaRefrigerador';

const refrigeradorRepository = new RefrigeradorRepository();

export const getAllRefrigeradores = async (): Promise<Refrigerador[]> => {
    try {
        return await refrigeradorRepository.findAll();
    } catch (error: any) {
        throw new DatabaseError(`Error al obtener refrigeradores: ${error.message}`);
    }
};

export const getRefrigeradorById = async (id: number): Promise<Refrigerador | null> => {
    if (!id) throw new MissingParameterError('El ID del refrigerador es requerido');
    try {
        const refrigerador = await refrigeradorRepository.findById(id);
        if (!refrigerador)
            throw new NotFoundError(`El refrigerador con ID ${id} no se encuentra en la base de datos`);
        return refrigerador;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al obtener refrigerador con ID ${id}: ${error.message}`);
    }
};

// export const getCodigoSegunMarca = async (marca: string): Promise<MarcaRefrigerador | null> => { 
//     if (!marca) throw new MissingParameterError(' del refrigerador es requerido');
//     try {
//         const marcaRefrigerador = await refrigeradorRepository.findByMarca(marca);
//         if (!marcaRefrigerador)
//             throw new NotFoundError(`La marca con nombre ${marca} no se encuentra en la base de datos`);
//         return marcaRefrigerador;
//     } catch (error: any) {
//         if (error instanceof NotFoundError) {
//             throw error;
//         }
//         throw new DatabaseError(`Error al obtener marca ${marca}: ${error.message}`);
//     }
// };


export const createRefrigerador = async (refrigeradorDto: RefrigeradorDTO): Promise<Refrigerador> => {
    if (Object.keys(refrigeradorDto).length === 0) {
        throw new MissingParameterError("El RefrigeradorDTO es requerido");
    }
    if (!refrigeradorDto.marca_nombre || !refrigeradorDto.id_local) {
        throw new RequiredFieldError("Los campos 'marca' y 'id_local' son obligatorios en RefrigeradorDTO");
    }
    try {
        const refrigerador = await refrigeradorRepository.create(refrigeradorDto);
        if (!refrigerador) 
            throw new NotFoundError("La marca o local no existe en la base de datos");
        return refrigerador;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al crear refrigerador: ${error.message}`);
    }
};

export const deleteRefrigerador = async (id: number): Promise<void> => {
    if (!id) throw new MissingParameterError('El ID del refrigerador es requerido');
    try {
        const filasEliminadas = await refrigeradorRepository.delete(id);
        if (filasEliminadas === 0) throw new NotFoundError(`El refrigerador a eliminar con ID ${id} no se encuentra en la base de datos`);
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al eliminar refrigerador con ID ${id}: ${error.message}`);
    }
};

export const putProductoInRefrigerador = async (id_refrigerador: number, id_producto: number, cantidad: number): Promise<void> => {
    if (!id_refrigerador || !id_producto || !cantidad) {
        throw new MissingParameterError('Los IDs del refrigerador y producto, y la cantidad son requeridos');
    }
    if (cantidad <= 0) {
        throw new InvalidValueError('cantidad', cantidad.toString());
    }
    try {
        const productoEnRefrigerador = await refrigeradorRepository.putProductoInRefrigerador(id_refrigerador, id_producto, cantidad);
        if (!productoEnRefrigerador) throw new NotFoundError(`No existe el producto con ID ${id_producto} en el refrigerador con ID ${id_refrigerador}`);
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al agregar producto al refrigerador: ${error.message}`);
    }
}

export const takeProductoFromRefrigerador = async (id_refrigerador: number, id_producto: number, cantidad: number): Promise<void> => {
    if (!id_refrigerador || !id_producto || !cantidad) {
        throw new MissingParameterError('Los IDs del refrigerador y producto, y la cantidad son requeridos');
    }
    if (cantidad <= 0) {
        throw new InvalidValueError('cantidad', cantidad.toString());
    }
    try {
        const productoEnRefrigerador = await refrigeradorRepository.takeProductoFromRefrigerador(id_refrigerador, id_producto, cantidad);
        if (!productoEnRefrigerador) throw new NotFoundError(`No existe el producto con ID ${id_producto} en el refrigerador con ID ${id_refrigerador}`);
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al quitar producto del refrigerador: ${error.message}`);
    }
}
