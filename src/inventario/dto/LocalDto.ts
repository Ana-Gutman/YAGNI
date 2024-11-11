export class LocalDTO {
    public id_local!: number;
    public nombre!: string;
    public direccion!: string;
    constructor(id_local: number,nombre:string, direccion: string) {
        this.id_local = id_local;
        this.nombre = nombre;
        this.direccion = direccion;
    }
}