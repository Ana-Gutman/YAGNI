import { Console } from "console";
import { Cliente } from "../../shared/models/cliente";
import { Usuario } from "../../shared/models/usuario";
import { UsuarioDTO } from "../dto/UsuarioDto";

// interface UsuarioFilter {

// }

class UsuarioRepository {
    async findAll(): Promise<Usuario[]> {
        return Usuario.findAll();
    }

    async findById(id: number): Promise<Usuario | null> {
        return await Usuario.findByPk(id);
    }

    async findByFirebaseUid(uid_firebase: string): Promise<Usuario | null> {
        return await Usuario.findOne({ where: { uid_firebase } });
    }

    async create(dataUsuario: { nombre: string, rol: string, uid_firebase: string, id_cocina?: number , id_camioneta?: number}, dataCliente?: { celular: string, idPrimerMedioPago: number }): Promise<Usuario> {
        const dataUsuarioCheck = { nombre: dataUsuario.nombre, rol: dataUsuario.rol, uid_firebase: dataUsuario.uid_firebase
            , id_cocina: dataUsuario.id_cocina === 0 ? null : dataUsuario.id_cocina ,
            id_camioneta: dataUsuario.id_camioneta === 0 ? null : dataUsuario.id_camioneta };
        const usuario = await Usuario.create(dataUsuarioCheck);
        if (dataUsuario.rol === 'Cliente' && dataCliente) {
            const id_usuario = usuario.id_usuario;
            const cliente = await Cliente.create({ id_usuario, celular: dataCliente.celular });
            cliente.addMedioPago(dataCliente.idPrimerMedioPago);
        }
        return usuario;
    }

    async update(id: number, usuarioDto: UsuarioDTO): Promise<Usuario | null> {
        await Usuario.update(usuarioDto, {
            where: { id_usuario: id },
        });
        return this.findById(id);
    }

    async delete(id: number): Promise<number> {
        return Usuario.destroy({
            where: { id_usuario: id },
        });
    }
}

export { UsuarioRepository };