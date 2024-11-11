import { ProductoRepository } from '../repositories/productoRepository';
import { ProductoDTO } from '../dto/ProductoDto';
import { Producto } from '../../shared/models/producto';
import { ValidationError, DatabaseError , NotFoundError} from '../../shared/errors';

const productoRepository = new ProductoRepository();

export const getAllProductos = async (): Promise<Producto[]> => {
    try {
        return await productoRepository.findAll();
    } catch (error:any) {
        throw new DatabaseError(`Error al obtener productos: ${error.message}`);
    }
};

export const getProductoById = async (id: number): Promise<Producto | null> => {
    if (!id) throw new ValidationError('El ID del producto es requerido');
    try {
        const producto = await productoRepository.findById(id);
        if (!producto) 
            throw new NotFoundError(`El producto con ID ${id} no se encuentra en la base de datos`);
        return producto;
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener producto con ID ${id}: ${error.message}`);
    }
};

export const createProducto = async (productoDto: ProductoDTO): Promise<Producto> => {
    if (!productoDto || !productoDto.nombre || !productoDto.precio_lista) {
        throw new ValidationError("ProductoDTO es nulo o faltan campos obligatorios");
    }
    try {
        const producto = await productoRepository.create(productoDto);
        if (!producto) 
            throw new DatabaseError("Error al crear el producto");
        return producto;
    } catch (error:any) {
        throw new DatabaseError(`Error al crear producto: ${error.message}`);
    }
};

export const updateProducto = async (id: number, productoDto: ProductoDTO): Promise<Producto | null> => {
    if (!id || !productoDto) 
        throw new ValidationError('El ID y ProductoDTO son requeridos');
    if (!productoDto.nombre || !productoDto.precio_lista) {
        throw new ValidationError("Los campos 'nombre' y 'precio_lista' son obligatorios en ProductoDTO");
    }
    try {
        const producto = await productoRepository.update(id, productoDto);
        if (!producto) 
            throw new NotFoundError(`El producto a modificar con ID ${id} no se encuentra en la base de datos`);
        return producto;
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al obtener producto con ID ${id}: ${error.message}`);
    }
};

export const deleteProducto = async (id: number): Promise<void> => {
    if (!id) throw new ValidationError('El ID del producto es requerido');
    try {
        const filasEliminadas = await productoRepository.delete(id);
        if (filasEliminadas === 0) throw new NotFoundError(`El producto a eliminar con ID ${id} no se encuentra en la base de datos`);
    } catch (error:any) {
        if (error instanceof NotFoundError) {
            throw error;  
        }
        throw new DatabaseError(`Error al eliminar producto con ID ${id}: ${error.message}`);
    }
};
