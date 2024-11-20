export class ClienteDTO {
  public id_cliente!: number;
  public id_usuario!: number;
  public celular!: string;
  public mediosDePago!: number[];
    constructor(id_cliente: number, id_usuario: number, celular: string, mediosDePago: number[]) {
        this.id_cliente = id_cliente;
        this.id_usuario = id_usuario
        this.celular = celular;
        this.mediosDePago = mediosDePago;
    }
}