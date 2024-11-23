export class LoteDTO {
    public id_lote!: number;
    public id_cocina!: number;
    public id_local_destino!: number;
    public id_producto!: number;
    public id_refrigerador?: number;
    public cantidad!: number;
    public fecha_retirado!: null;
    public entregado: boolean;
    constructor(id_lote: number, id_cocina: number, id_local_destino: number, id_producto: number,cantidad: number, id_refrigerador?: number,  entregado?: boolean, fecha_retirado?: Date) {
        this.id_lote = id_lote;
        this.id_cocina = id_cocina;
        this.id_local_destino = id_local_destino;
        this.id_producto = id_producto;
        this.id_refrigerador = id_refrigerador;
        this.cantidad = cantidad;
        this.fecha_retirado =  null;
        this.entregado =  false;
    }
}


export class LoteUpdateRetiroDto{
    public fecha_retirado!: Date;
    constructor(fecha_retirado: Date) {
        this.fecha_retirado = fecha_retirado;
    }
}