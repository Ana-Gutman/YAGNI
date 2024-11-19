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

    async create(data:{nombre: string, rol:string, uid_firebase: string}): Promise<Usuario> {
        const usuario = Usuario.create(data);
        if (data.rol !== 'Cliente') {
            //TODO: PEDIR DATOS DEL CLIENTE QUE FALTAN Y AGREGALOS A SUS RESPECTIVAS TABLAS
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

export  {UsuarioRepository};