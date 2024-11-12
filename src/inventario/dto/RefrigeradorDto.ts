export class RefrigeradorDTO {
    public id_refrigerador!: number;
    public marca_nombre!: string;
    public id_local!: number;
    constructor(id_refrigerador: number, marca_nombre: string, id_local: number) {
        this.id_refrigerador = id_refrigerador;
        this.marca_nombre = marca_nombre;
        this.id_local = id_local;
    }
}