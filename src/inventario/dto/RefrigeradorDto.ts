export class RefrigeradorDTO {
    public id_refrigerador!: number;
    public marca!: string;
    public id_local!: number;
    constructor(id_refrigerador: number, marca: string, id_local: number) {
        this.id_refrigerador = id_refrigerador;
        this.marca = marca;
        this.id_local = id_local;
    }
}