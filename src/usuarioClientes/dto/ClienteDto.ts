export class ClienteDTO {
  public id_cliente!: number;
  public nombre!: string;
  public celular!: string;
    constructor(id_cliente: number, nombre: string, celular: string) {
        this.id_cliente = id_cliente;
        this.nombre = nombre;
        this.celular = celular;
    }
}