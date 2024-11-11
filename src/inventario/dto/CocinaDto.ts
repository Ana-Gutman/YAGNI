export class CocinaDTO {
    public id_cocina!: number;
    public direccion!: string;
    constructor(id_cocina: number, direccion: string) {
        this.id_cocina = id_cocina;
        this.direccion = direccion
    }
}