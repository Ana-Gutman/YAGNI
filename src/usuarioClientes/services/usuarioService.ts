import { UsuarioRepository } from '../repositories/usuarioRepository';
import { UsuarioDTO } from '../dto/UsuarioDto';
import { Usuario } from '../../shared/models/usuario';
import { MissingParameterError, InvalidValueError, RequiredFieldError, DatabaseError, NotFoundError } from '../../shared/errors';

const usuarioRepository = new UsuarioRepository();

export const getAllUsuarios = async (): Promise<Usuario[]> => {
    try {
        return await usuarioRepository.findAll();
    } catch (error: any) {
        throw new DatabaseError(`Error al obtener usuarios: ${error.message}`);
    }
};

export const getUsuarioById = async (id: number): Promise<Usuario | null> => {
    if (!id) throw new MissingParameterError('El ID del usuario es requerido');
    try {
        const usuario = await usuarioRepository.findById(id);
        if (!usuario)
            throw new NotFoundError(`El usuario con ID ${id} no se encuentra en la base de datos`);
        return usuario;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al obtener usuario con ID ${id}: ${error.message}`);
    }
};

export const createUsuario = async (usuarioDto: UsuarioDTO): Promise<Usuario> => {
    if (Object.keys(usuarioDto).length === 0) {
        throw new MissingParameterError("El UsuarioDTO es requerido");
    }
    if (!usuarioDto.nombre || !usuarioDto.rol) {
        throw new RequiredFieldError("Los campos 'nombre' y 'rol' son obligatorios en UsuarioDTO");
    }
    if (usuarioDto.rol !== 'Admin' && usuarioDto.rol !== 'Supervisor Cocina' && usuarioDto.rol !== 'Supervisor Local' && usuarioDto.rol !== 'Dispositivo') {
        throw new InvalidValueError("rol", usuarioDto.rol);
    }
    try {
        const usuario = await usuarioRepository.create(usuarioDto);
        if (!usuario)
            throw new DatabaseError("Error al crear el usuario");
        return usuario;
    } catch (error: any) {
        throw new DatabaseError(`Error al crear usuario: ${error.message}`);
    }
};

export const updateUsuario = async (id: number, usuarioDto: UsuarioDTO): Promise<Usuario | null> => {
    if (!id || Object.keys(usuarioDto).length === 0)
        throw new MissingParameterError('El ID y UsuarioDTO son requeridos');
    if (!usuarioDto.nombre || !usuarioDto.rol) {
        throw new RequiredFieldError("Los campos 'nombre' y 'rol' son obligatorios en UsuarioDTO");
    }
    if (usuarioDto.rol !== 'Admin' && usuarioDto.rol !== 'Supervisor Cocina' && usuarioDto.rol !== 'Supervisor Local' && usuarioDto.rol !== 'Dispositivo') {
        throw new InvalidValueError("rol", usuarioDto.rol);
    }
    try {
        const usuario = await usuarioRepository.update(id, usuarioDto);
        if (!usuario)
            throw new NotFoundError(`El usuario a modificar con ID ${id} no se encuentra en la base de datos`);
        return usuario;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al obtener usuario con ID ${id}: ${error.message}`);
    }
};

export const deleteUsuario = async (id: number): Promise<void> => {
    if (!id) throw new MissingParameterError('El ID del usuario es requerido');
    try {
        const filasEliminadas = await usuarioRepository.delete(id);
        if (filasEliminadas === 0) throw new NotFoundError(`El usuario a eliminar con ID ${id} no se encuentra en la base de datos`);
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError(`Error al eliminar usuario con ID ${id}: ${error.message}`);
    }
};


