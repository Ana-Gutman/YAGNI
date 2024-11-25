import { ProductoPedidoDTO } from "./ProductoPedidoDto";

export interface PaymentData {
    amount: number;
    currency: string;
    paymentMethod: string; // Renombrado de "method" para alinear con el body
    details: {
        cardNumber?: string;
        expiryDate?: string;
        cvv?: string;
        [key: string]: any; // Permitir campos adicionales si es necesario
    };
}
export class PedidoDTO {
    public id_pedido!: number;
    public id_cliente!: number;
    public id_medio_pago!: number;
    public id_local!: number;
    public retirado!: Date | null;
    public hora_de_retiro!: Date | string | null;
    public productos!: ProductoPedidoDTO[];
    public estado!: string;
    public paymentData!: {
        amount: number;
        currency: string;
        method: string; // Cambiado de 'paymentMethod' a 'method'
        details: any;
    };
    constructor(
        id_pedido: number,
        id_cliente: number,
        id_medio_pago: number,
        id_local: number,
        hora_de_retiro: Date | string | null,
        productos: ProductoPedidoDTO[],
        paymentData: {
            amount: number;
            currency: string;
            method: string; // Aquí también debe estar 'method'
            details: any;
        },
        retirado: Date | null = null,
        estado: string = "Iniciado"
    ) {
        this.id_pedido = id_pedido;
        this.id_cliente = id_cliente;
        this.id_medio_pago = id_medio_pago;
        this.id_local = id_local;
        this.hora_de_retiro = hora_de_retiro;
        this.hora_de_retiro = typeof this.hora_de_retiro === 'string' ? new Date(this.hora_de_retiro) : this.hora_de_retiro;
        this.retirado = retirado;
        this.productos = productos;
        this.estado = estado;
        this.paymentData = paymentData;
    }
}
