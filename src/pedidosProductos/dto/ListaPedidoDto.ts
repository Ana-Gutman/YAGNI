export interface ListaPedidoDTO {
    id_cliente: number;
    nombreCliente: string;
    id_pedido: number; 
    estado: string; 
    fechaPedido: Date;
    horaRealizado: string;
    horaRetirado: string | null;
    tiempoTranscurrido: string | null;
}

export class ListaPedidosDeClienteDto{
    public id_cliente!: number;
    public fechaInicio!: Date;
    public fechaFin!: Date;
    public estado?: 'Completo' | 'Incompleto';
    constructor(id_cliente: number, fechaInicio: Date, fechaFin: Date, estado?: 'Completo' | 'Incompleto'){
        this.id_cliente = id_cliente;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
    }
}