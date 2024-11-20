import { RefrigeradorRepository } from '../repositories/refrigeradorRepository';
import { RefrigeradorDTO } from '../dto/RefrigeradorDto';
import { Refrigerador } from '../../shared/models/refrigerador';
import { MissingParameterError, RequiredFieldError, DatabaseError, NotFoundError, InvalidValueError } from '../../shared/utils/customErrors';
import OTPGenerator from '../../utils/OTPGenerator'; 
import { ProductoDTO } from '../dto/ProductoDto'; 
import { Pedido } from '../../shared/models/pedido';
import { ProductoPedido } from '../../shared/models/productoPedido';
import { ProductoRefrigerador } from '../../shared/models/productoRefrigerador';
import { enviarEmail } from '../../shared/services/emailService';
import { LocalRepository } from '../repositories/localRepository';
import { Op } from 'sequelize';
import { MovimientoRefrigerador } from '../../shared/models/movimientoRefrigerador';
import { ExistenciasDTO } from '../dto/ExistenciasDto';

const refrigeradorRepository = new RefrigeradorRepository();
const localRepository = new LocalRepository();

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

export const generarOTP = async (idRefrigerador: string): Promise<string> => {
    if (!idRefrigerador) {
        throw new MissingParameterError('El ID del refrigerador es requerido');
    }

    const otp = await OTPGenerator.generateOTP(idRefrigerador);

    const email = 'federicacdoglio@gmail.com'; 
    await enviarEmail(email, 'Tu OTP para Refrigerador', `Tu OTP es: ${otp}`);

    return otp;
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

export const modificarInventarioConOTP = async (
    idRefrigerador: string,
    otp: string,
    productos: ProductoDTO[],
    operacion: 'agregar' | 'retirar'
  ): Promise<void> => {
    if (!idRefrigerador || !otp || !productos || productos.length === 0) {
      throw new MissingParameterError('El ID del refrigerador, OTP y productos son requeridos');
    }
  
    const isValid = await OTPGenerator.validateOTP(idRefrigerador, otp);
    if (!isValid) {
      throw new InvalidValueError('OTP inválido o expirado', otp);
    }
  
    if (operacion === 'agregar') {
      await refrigeradorRepository.actualizarInventario(idRefrigerador, productos);
    } else {
      await refrigeradorRepository.retirarInventario(idRefrigerador, productos);
    }
  };
  

  export const getRefrigeradoresPorPedido = async (idLocal: number, idPedido: number) => {
    const pedido = await Pedido.findOne({
        where: { id_pedido: idPedido, id_local: idLocal },
    });

    if (!pedido) {
        throw new Error(`El pedido ${idPedido} no pertenece al local ${idLocal}`);
    }

    const productosPedido = await pedido.getProductoPedidos({ attributes: ["id_producto"] });
    const productosIds = productosPedido.map((pp) => pp.id_producto);

    const refrigeradores = await Refrigerador.findAll({
        where: { id_local: idLocal },
        include: [
            {
                model: ProductoRefrigerador,
                where: { id_producto: productosIds },
                attributes: [],
            },
        ],
        attributes: ["id_refrigerador", "marca_nombre"],
        group: ["Refrigerador.id_refrigerador"],
    });

    return refrigeradores;
};

export const obtenerRefrigeradoresPorLocal = async (idLocal: number) => {
    if (!idLocal) throw new Error('El ID del local es requerido.');
    const local = await localRepository.findById(idLocal);
    if (!local) throw new NotFoundError(`El local con ID ${idLocal} no se encuentra en la base de datos.`);
    const refrigeradores = await refrigeradorRepository.findRefrigeradoresOfLocal(idLocal);
    return refrigeradores
};


export const validarOTP = async (idRefrigerador: string, otp: string): Promise<boolean> => {
    if (!idRefrigerador || !otp) {
        throw new MissingParameterError('El ID del refrigerador y el OTP son requeridos');
    }

    const isValid = await OTPGenerator.validateOTP(idRefrigerador, otp);
    return isValid;
};


export const modificarInventario = async (
    idRefrigerador: string,
    productos: ProductoDTO[],
    operacion: 'agregar' | 'retirar'
): Promise<void> => {
    if (!idRefrigerador || !productos || productos.length === 0) {
        throw new MissingParameterError('El ID del refrigerador y productos son requeridos');
    }

    if (operacion === 'agregar') {
        await refrigeradorRepository.actualizarInventario(idRefrigerador, productos);
    } else {
        await refrigeradorRepository.retirarInventario(idRefrigerador, productos);
    }
};

export async function listarExistenciasPorProducto(idProducto: string, fechaInicio?: string, fechaFin?: string) :Promise<ExistenciasDTO[]> {
    if (!idProducto) {
        throw new MissingParameterError('El idProducto es requerido.');
    }
    let fInicio = null;
    let fFin = null;
    const id_producto = parseInt(idProducto);
    if (isNaN(id_producto)) {
        throw new InvalidValueError('idProducto', idProducto, 'El idProducto debe ser un número.');
    }
    try {
        if (fechaInicio && fechaFin){
            fInicio = new Date(fechaInicio);
            fFin = new Date(fechaFin);
        }
        else if (fechaFin || fechaInicio){
            throw new MissingParameterError('Se debe ingresar ambas fechas para el filtrado o ninguna para obtener la existencia actual del producto en los refrigeradores.');
        }
        
    }catch (err){
        throw new InvalidValueError('fechas', '', 'El formato de fecha es incorrecto.');
    }

    if (fInicio && fFin && fInicio > fFin){ 
        throw new InvalidValueError('rango fechas', '', 'La fecha de inicio debe ser menor a la fecha de fin.');
    }

    return await refrigeradorRepository.ListarExistenciasPorProducto(id_producto, fInicio ?? undefined, fFin ?? undefined);
  
    
  }