import { Producto } from "../../shared/models/producto";
import { Sequelize, Op } from "sequelize";
import { ProductoDTO } from "../dto/ProductoDto";
import { DatabaseError } from "../../shared/errors";

// interface ProductoFilter {
//     id_producto?: number;
//     nombre?: string;
//     descripcion?: string;
//     ingredientes?: string;
//     precio_lista?: number;
// }

class ProductoRepository {
    async findAll(): Promise<Producto[]> {
        try{
            return Producto.findAll();
        } catch (error:any) {
            throw new DatabaseError(`Error al obtener productos: ${error.message}`);
        }
    }
  
    async findById(id: number): Promise<Producto | null> {
      try{
        return Producto.findByPk(id);
      } catch (error:any) {
        throw new DatabaseError(`Error al obtener producto con ID ${id}: ${error.message}`);
      }
    }
  
    async create(productoDto: ProductoDTO): Promise<Producto> {
        try{
            const producto = { ...productoDto };
            return Producto.create(producto);
        } catch (error:any) {
            throw new DatabaseError(`Error al crear producto: ${error.message}`);
        }     
    }

    async update(id: number, productoDto: ProductoDTO): Promise<Producto | null>{
        try {
            const [filasActualizadas] = await Producto.update(productoDto, {
                where: { id_producto: id },
            });

            if (filasActualizadas === 0) 
                return null;
            return this.findById(id);
        } catch (error:any) {
            throw new DatabaseError(`Error al actualizar producto con ID ${id}: ${error.message}`);
        }
            
    }
  
  
    async delete(id: number): Promise<number> {
        try{
            return Producto.destroy({
                where: { id_producto: id },
            });
        } catch (error:any) {
            throw new DatabaseError(`Error al eliminar producto con ID ${id}: ${error.message}`);
        }
    }
}

export { ProductoRepository };