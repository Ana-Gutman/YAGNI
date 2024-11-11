import { Cocina } from "../../shared/models/cocina";
import { CocinaDTO } from "../dto/CocinaDto";

// interface CocinaFilter {

// }

class CocinaRepository {
    async findAll(): Promise<Cocina[]> {
        return Cocina.findAll();
    }
  
    async findById(id: number): Promise<Cocina | null> {
        return await Cocina.findByPk(id);
    }
  
    async create(cocinaDto: CocinaDTO): Promise<Cocina> {
        const cocina = { ...cocinaDto };
        return Cocina.create(cocina);  
    }

    async update(id: number, cocinaDto: CocinaDTO): Promise<Cocina | null> {
        await Cocina.update(cocinaDto, {
            where: { id_cocina: id },
        });
        return this.findById(id);
    }
  
    async delete(id: number): Promise<number> {
        return Cocina.destroy({
            where: { id_cocina: id },
        });
    }
}

export { CocinaRepository };
