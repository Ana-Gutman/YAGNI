import { Usuario } from "../../shared/models/usuario";
import { UsuarioDTO } from "../dto/UsuarioDto";

export const findAllUsuarios = async () => {
    return await Usuario.findAll();
}

export const findUsuarioById = async (id: number) => {
    return await Usuario.findByPk(id);
}

export const createUsuario = async (usuarioDto: UsuarioDTO) => {
    if (!usuarioDto) throw new Error('UsuarioDTO is null');
    const usuario = { ...usuarioDto };
    return await Usuario.create(usuario);
}

export const updateUsuario = async (id: number, usuarioDto: UsuarioDTO) => {
    if (!usuarioDto) throw new Error('UsuarioDTO is null');
    return await Usuario.update(usuarioDto, { where: { id_usuario: id } });
}

export const deleteUsuario = async (id: number) => {
    return await Usuario.destroy({ where: { id_usuario: id } });
}


