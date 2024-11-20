export class UsuarioDTO {
  public id_usuario!: number;
  public nombre!: string;
  public email!: string;
  public contraseña!: string;
  public rol!: string;
  public celular?: string;
  public idPrimerMedioPago?: number;
  constructor(id_usuario: number, nombre: string, rol: string, email: string, contraseña: string, celular?: string, idPrimerMedioPago?: number) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
    this.rol = rol;
    this.celular = celular;
    this.idPrimerMedioPago = idPrimerMedioPago;
  }
}