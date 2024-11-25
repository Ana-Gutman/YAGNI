import { ProductoPedidoDTO } from "./ProductoPedidoDto";

export class PedidoDTO{
    public id_pedido!: number;
    public id_cliente!: number;
    public id_medio_pago!: number
    public id_local!: number
    public hora_de_retiro!: Date;
    public retirado!: Date;
    public productos!: ProductoPedidoDTO[];
    public estado!: string;
    constructor(id_pedido: number, id_cliente: number, id_medio_pago: number, id_local: number, retirado: Date, hora_de_retiro:Date, productos: ProductoPedidoDTO[]){
        console.log("hora_de_retiro", hora_de_retiro)
        this.id_pedido = id_pedido;
        this.id_cliente = id_cliente;
        this.id_medio_pago = id_medio_pago;
        this.id_local = id_local;
        this.hora_de_retiro = typeof hora_de_retiro === 'string' ? new Date(hora_de_retiro) : hora_de_retiro;
        this.retirado = retirado;
        this.productos = productos;
        this.estado = "Iniciado";
    }
}