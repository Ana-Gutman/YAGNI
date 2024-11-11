export class CamionetaDTO {
    public id_camioneta!: number;
    public matricula!: string;
    constructor(id_camioneta: number, matricula: string) {
        this.id_camioneta = id_camioneta;
        this.matricula = matricula
    }
}