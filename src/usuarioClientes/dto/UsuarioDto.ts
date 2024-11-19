export class UsuarioDTO {
  public id_usuario!: number;
  public nombre!: string;
  public email!: string;
  public contraseña!: string;
  public rol!: string;
  constructor(id_usuario: number, nombre: string, rol: string, email: string, contraseña: string) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
    this.rol = rol;
  }
}