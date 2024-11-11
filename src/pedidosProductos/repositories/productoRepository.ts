import { Producto } from "../../shared/models/producto";
import { Sequelize, Op } from "sequelize";
import { ProductoDTO } from "../dto/ProductoDto";

// interface ProductoFilter {
//     id_producto?: number;
//     nombre?: string;
//     descripcion?: string;
//     ingredientes?: string;
//     precio_lista?: number;
// }

class ProductoRepository {
    async findAll(): Promise<Producto[]> {
        return Producto.findAll();
    }
  
    async findById(id: number): Promise<Producto | null> {
        return await Producto.findByPk(id);
    }
  
    async create(productoDto: ProductoDTO): Promise<Producto> {
        const producto = { ...productoDto };
        return Producto.create(producto);  
    }

    async update(id: number, productoDto: ProductoDTO): Promise<Producto | null>{
        await Producto.update(productoDto, {
            where: { id_producto: id },
        });
        return this.findById(id);
    }
  
  
    async delete(id: number): Promise<number> {
        return Producto.destroy({
            where: { id_producto: id },
        });
    }
}

export { ProductoRepository };