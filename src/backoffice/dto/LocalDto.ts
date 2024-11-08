export class LocalDTO {
    public id_local!: number;
    public direccion!: string;
    constructor(id_local: number, direccion: string) {
        this.id_local = id_local;
        this.direccion = direccion
    }
}