export class ExistenciasDTO{
    id_refrigerador!: number;
    historial!: {fecha: Date, existencia: number}[];
    constructor(id_refrigerador: number, historial: {fecha: Date, existencia: number}[]){
        this.id_refrigerador = id_refrigerador;
        this.historial = historial;
    }
}