import { Cocina } from "../../shared/models/cocina";
import { CocinaLocal } from "../../shared/models/cocinaLocal";
import { Local } from "../../shared/models/local";
import { ProductoRefrigerador } from "../../shared/models/productoRefrigerador";
import { Refrigerador } from "../../shared/models/refrigerador";
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

    async getStockDeProducto(id_local: number, id_producto: number): Promise<number> {
        try {
            const productosRefrigerador = await ProductoRefrigerador.findAll({
              where: {
                id_producto: id_producto,
              },
              include: [
                {
                  model: Refrigerador,
                  where: {
                    id_local: id_local,
                  },
                  required: true, 
                },
              ],
            });
        
            const cantidadTotal = productosRefrigerador.reduce((total, productoRefrigerador) => {
              return total + productoRefrigerador.cantidad;
            }, 0);
        
            return cantidadTotal;
        } catch (error) {
            console.error('Error al obtener la cantidad del producto:', error);
            throw error;
        }
    }

    async getCocinaDeLocal(id_local: number) {
      return await CocinaLocal.findOne({
          where: { id_local },
          include: [{ model: Cocina }],
      }
    );
  }
}

export { LocalRepository };