export class ProductoPedidoDTO{
    public id_producto!: number;
    public nombre!: string;
    public cantidad!: number;
    constructor(id_producto: number, nombre:string, cantidad: number){
        this.id_producto = id_producto;
        this.cantidad = cantidad;
    }
}