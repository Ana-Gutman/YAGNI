export class UsuarioDTO {
  public id_usuario!: number;
  public nombre!: string;
  public rol!: string;
  constructor(id_usuario: number, nombre: string, rol: string) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.rol = rol;
  }
}