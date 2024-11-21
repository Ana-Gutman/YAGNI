import { UsuarioRepository } from '../repositories/usuarioRepository';
import { UsuarioDTO } from '../dto/UsuarioDto';
import { Usuario } from '../../shared/models/usuario';
import { MissingParameterError, InvalidValueError, RequiredFieldError, DatabaseError, NotFoundError } from '../../shared/utils/customErrors';
import admin from '../../shared/config/firebase';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "AIzaSyBurpEG9jJ1C3dMLNkN9FFsQgncSAWrDJg"; 

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

export const checkInputForUsuario = (usuarioDto: UsuarioDTO): void => {
    if (Object.keys(usuarioDto).length === 0) {
        throw new MissingParameterError("El UsuarioDTO es requerido");
    }
    if (!usuarioDto.nombre || !usuarioDto.rol || !usuarioDto.email || !usuarioDto.contraseña) {
        throw new RequiredFieldError("Los campos 'nombre', 'email', 'contraseña' y 'rol' son obligatorios en UsuarioDTO");
    }
    if (usuarioDto.rol !== 'Admin' && usuarioDto.rol !== 'Supervisor Cocina' && usuarioDto.rol !== 'Supervisor Local' && usuarioDto.rol !== 'Dispositivo'
        && usuarioDto.rol !== 'Cliente' && usuarioDto.rol !== 'Repartidor') {
        throw new InvalidValueError("rol", usuarioDto.rol);
    }
    if (!usuarioDto.email.includes('@') || !usuarioDto.email.includes('.com')) {
        throw new InvalidValueError("email", usuarioDto.email, "Debe ser un email válido");
    }
    if (!usuarioDto.contraseña.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/)) {
        throw new InvalidValueError("contraseña", usuarioDto.contraseña, "Debe tener 12 o más caracteres, incluyendo una o más mayúsculas, uno o más números y uno o más símbolos especiales");
    }
    if (usuarioDto.rol === 'Cliente' && (!usuarioDto.celular || !usuarioDto.idPrimerMedioPago)) {
        throw new RequiredFieldError("El campo 'celular' y 'primerMedioDePago' son obligatorios en UsuarioDTO si el rol es 'Cliente'");
    }
    if (usuarioDto.rol === 'Supervisor Cocina' && !usuarioDto.id_cocina) {
        throw new RequiredFieldError("El campo 'id_cocina' es obligatorio en UsuarioDTO si el rol es 'Supervisor Cocina'");
    }
};

export const createUsuario = async (usuarioDto: UsuarioDTO): Promise<Usuario> => {
    try {
        const dirEmail = usuarioDto.email;
        const nombre = usuarioDto.nombre;
        const rol = usuarioDto.rol;
        const celular = usuarioDto.celular;
        const idPrimerMedioPago = usuarioDto.idPrimerMedioPago;
        const userRecord = await admin.auth().createUser({ email: dirEmail, emailVerified: true, password: usuarioDto.contraseña});
        console.log('Usuario creado en Firebase con uid:', userRecord.uid);
        const uid_firebase = userRecord.uid;
        let usuario = null;
        const dataUsuario = {nombre, rol, uid_firebase, id_cocina: usuarioDto.id_cocina};
        if (rol === 'Cliente' && celular && idPrimerMedioPago) {
            const dataCliente = {celular, idPrimerMedioPago}; 
            usuario = await usuarioRepository.create(dataUsuario, dataCliente);
        }
        if (rol !== 'Cliente') {
            usuario = await usuarioRepository.create(dataUsuario);
        }


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

export const login = async (idToken: string): Promise<{token:string, usuario: Usuario}> => {
    if (!idToken) throw new MissingParameterError('El IDToken es requerido');
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    const usuario = await usuarioRepository.findByFirebaseUid(decodedToken.uid); 
    if (!usuario) throw new NotFoundError(`El usuario con uid=${decodedToken.uid} no se encuentra en la base de datos`);

    const token = jwt.sign({ id: usuario.id_usuario, 
        rol: usuario.rol }, 
        SECRET_KEY, 
        { expiresIn: '1h' });
    
    return {token, usuario};
}

