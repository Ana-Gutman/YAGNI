export interface ListaPedidoDTO {
    idCliente: number;
    nombreCliente: string;
    fechaPedido: Date;
    horaRealizado: string;
    horaRetirado: string | null;
    tiempoTranscurrido: string | null;
  }
  
export class ListaPedidosDeClienteDto{
    public id_cliente!: number;
    public fechaInicio!: Date;
    public fechaFin!: Date;
    constructor(id_cliente: number, fechaInicio: Date, fechaFin: Date){
        this.id_cliente = id_cliente;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
}