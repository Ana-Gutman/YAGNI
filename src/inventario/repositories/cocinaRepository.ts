import { Camioneta } from "../../shared/models/camioneta";
import { Cocina } from "../../shared/models/cocina";
import { CocinaCamioneta } from "../../shared/models/cocinaCamioneta";
import { CocinaDTO } from "../dto/CocinaDto";


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


    async getCamionetaIdsDeCocina(id_cocina: number): Promise<number[]> {
        const relaciones = await CocinaCamioneta.findAll({
            where: { id_cocina },
            attributes: ['id_camioneta'], 
        });
    
        return relaciones.map((rel) => rel.id_camioneta); 
    }
}

export { CocinaRepository };
