export class ProductoDTO {
    public id_producto!: number;
    public cantidad_cambiada!: number;

    constructor(id_producto: number, cantidad: number) {
        this.id_producto = id_producto;
        this.cantidad_cambiada = cantidad;
    }
}
