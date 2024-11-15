import { RefrigeradorRepository } from '../repositories/refrigeradorRepository';
import { RefrigeradorDTO } from '../dto/RefrigeradorDto';
import { Refrigerador } from '../../shared/models/refrigerador';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError, InvalidValueError } from '../../shared/errors/customErrors';
import { MarcaRefrigerador } from '../../shared/models/marcaRefrigerador';
import OTPGenerator from '../../utils/OTPGenerator'; // Importamos el generador de OTP
import { ProductoDTO } from '../dto/ProductoDto'; // Asegúrate de tener este DTO
import redisClient from '../../shared/database/redis';
import { ProductoRefrigerador } from '../../shared/models/productoRefrigerador';

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
export const putProductoInRefrigerador = async (id_refrigerador: number, id_producto: number, cantidad: number): Promise<ProductoRefrigerador> =>{
    let productoEnRefrigerador = await ProductoRefrigerador.findOne({
        where: { id_refrigerador, id_producto },
    });

    if (!productoEnRefrigerador) {
        productoEnRefrigerador = await ProductoRefrigerador.create({
            id_refrigerador,
            id_producto,
            cantidad,
        });
    } else {
        productoEnRefrigerador.cantidad += cantidad;
        await productoEnRefrigerador.save();
    }

    return productoEnRefrigerador;
}


export const takeProductoFromRefrigerador = async (id_refrigerador: number, id_producto: number, cantidad: number): Promise<void> => {
    if (!id_refrigerador || !id_producto || typeof cantidad !== 'number' || cantidad <= 0) {
        throw new MissingParameterError('Los IDs del refrigerador y producto, y una cantidad positiva son requeridos');
    }

    const lockKey = `lock:${id_refrigerador}:${id_producto}`;
    const lock = await redisClient.set(lockKey, 'locked', { NX: true, EX: 5 });
    if (!lock) {
        throw new Error('Otro proceso está actualizando el stock, intenta nuevamente.');
    }

    try {
        const productoEnRefrigerador = await refrigeradorRepository.takeProductoFromRefrigerador(id_refrigerador, id_producto, cantidad);
        if (!productoEnRefrigerador) throw new NotFoundError(`No existe el producto con ID ${id_producto} en el refrigerador con ID ${id_refrigerador}`);
    } finally {
        await redisClient.del(lockKey);
    }
};


// Nueva funcionalidad: Generar OTP
export const generarOTP = async (idRefrigerador: string): Promise<string> => {
    if (!idRefrigerador) {
        throw new MissingParameterError('El ID del refrigerador es requerido');
    }
    return await OTPGenerator.generateOTP(idRefrigerador);
};

export const validarIngresoStock = async (idRefrigerador: string, otp: string, productos: any[]): Promise<void> => {
    if (!idRefrigerador || !otp || !productos || productos.length === 0) {
        throw new MissingParameterError('El ID del refrigerador, OTP y productos son requeridos');
    }

    const isValid = await OTPGenerator.validateOTP(idRefrigerador, otp);
    if (!isValid) {
        throw new InvalidValueError('OTP inválido o expirado', otp);
    }

    await refrigeradorRepository.actualizarInventario(idRefrigerador, productos);
};




export const obtenerRefrigeradoresPorLocal = async (idLocal: string) => {
    if (!idLocal) throw new Error('El ID del local es requerido.');
    return await refrigeradorRepository.findByLocalId(idLocal);
};
