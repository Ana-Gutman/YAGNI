import { Camioneta } from "../../shared/models/camioneta";
import { CamionetaDTO } from "../dto/CamionetaDto";

class CamionetaRepository {
    async findAll(): Promise<Camioneta[]> {
        return Camioneta.findAll();
    }
  
    async findById(id: number): Promise<Camioneta | null> {
        return await Camioneta.findByPk(id);
    }
  
    async create(camionetaDto: CamionetaDTO): Promise<Camioneta> {
        const camioneta = { ...camionetaDto };
        return Camioneta.create(camioneta);  
    }

    async update(id: number, camionetaDto: CamionetaDTO): Promise<Camioneta | null> {
        await Camioneta.update(camionetaDto, {
            where: { id_camioneta: id },
        });
        return this.findById(id);
    }
  
    async delete(id: number): Promise<number> {
        return Camioneta.destroy({
            where: { id_camioneta: id },
        });
    }
}

export { CamionetaRepository };
