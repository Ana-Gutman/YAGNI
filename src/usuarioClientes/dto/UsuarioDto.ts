export class UsuarioDTO {
  public id_usuario!: number;
  public nombre!: string;
  public email!: string;
  public contraseña!: string;
  public rol!: string;
  public celular?: string;
  public idPrimerMedioPago?: number;
  public id_cocina?: number;
  public id_camioneta?: number;
  constructor(id_usuario: number, nombre: string, rol: string, email: string, contraseña: string, celular?: string, idPrimerMedioPago?: number, id_cocna?: number, id_camioneta?: number) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
    this.rol = rol;
    this.celular = celular;
    this.idPrimerMedioPago = idPrimerMedioPago;
    this.id_cocina = id_cocna;
    this.id_camioneta = id_camioneta;
  }
}