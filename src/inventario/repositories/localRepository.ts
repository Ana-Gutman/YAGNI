import { Local } from "../../shared/models/local";
import { LocalDTO } from "../dto/LocalDto";

// interface LocalFilter {

// }

class LocalRepository {
    async findAll(): Promise<Local[]> {
        return Local.findAll();
    }
  
    async findById(id: number): Promise<Local | null> {
        return await Local.findByPk(id);
    }
  
    async create(localDto: LocalDTO): Promise<Local> {
        const local = { ...localDto };
        return Local.create(local);  
    }

    async update(id: number, localDto: LocalDTO): Promise<Local | null>{
        await Local.update(localDto, {
            where: { id_local: id },
        });
        return this.findById(id);
    }
  
  
    async delete(id: number): Promise<number> {
        return Local.destroy({
            where: { id_local: id },
        });
    }
}

export { LocalRepository };