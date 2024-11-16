export class ProductoDTO {
    public id_producto!: number;
    public cantidad!: number;

    constructor(id_producto: number, cantidad: number) {
        this.id_producto = id_producto;
        this.cantidad = cantidad;
    }
}
