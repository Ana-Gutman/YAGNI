export class RefrigeradorDTO {
    public id_refrigerador!: number;
    public marca!: string;
    public tipo_codigo!: string;
    public id_local!: number;
    constructor(id_refrigerador: number, marca: string, tipo_codigo: string, id_local: number) {
        this.id_refrigerador = id_refrigerador;
        this.marca = marca;
        this.tipo_codigo = tipo_codigo;
        this.id_local = id_local;
    }
}