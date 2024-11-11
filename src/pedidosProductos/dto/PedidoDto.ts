export class PedidoDTO{
    public id_pedido!: number;
    public id_cliente!: number;
    public id_medio_pago!: number
    public id_local!: number
    public retirado!: Date;
    public estado!: string;
    constructor(id_pedido: number, id_cliente: number, id_medio_pago: number, id_local: number, retirado: Date, estado: string){
        this.id_pedido = id_pedido;
        this.id_cliente = id_cliente;
        this.id_medio_pago = id_medio_pago;
        this.id_local = id_local;
        this.retirado = retirado;
        this.estado = estado;
    } 
}