import { Op } from "sequelize";
import { Producto } from "../../shared/models/producto";
import { ProductoDTO } from "../dto/ProductoDto";
import { ProductoRefrigerador } from "../../shared/models/productoRefrigerador";
import { Refrigerador } from "../../shared/models/refrigerador";
import { ProductoRefrigeradorDTO } from "../../inventario/dto/ProductoRefrigeradorDto";

// interface ProductoFilter {
// }

class ProductoRepository {
    // async getExistenciasPorProducto(id_producto: number, fechaInicio: string, fechaFin: string): Promise< ProductoRefrigeradorDTO[] | null> {
    //     const whereClause: any = {
    //         id_producto,
    //     };

    //     if (fechaInicio && fechaFin) {
    //         whereClause.createdAt = {
    //             [Op.between]: [new Date(fechaInicio as string), new Date(fechaFin as string)],
    //         };
    //     } else if (fechaInicio) {
    //         whereClause.createdAt = {
    //             [Op.gte]: new Date(fechaInicio as string),
    //         };
    //     } else if (fechaFin) {
    //         whereClause.createdAt = {
    //             [Op.lte]: new Date(fechaFin as string),
    //         };
    //     }

    //     // Obtener las existencias del producto en cada refrigerador
    //     const existencias = await ProductoRefrigerador.findAll({
    //         where: whereClause,
    //         include: [
    //             {
    //                 model: Refrigerador,
    //                 attributes: ['id_refrigerador', 'marca_nombre'],
    //             },
    //         ],
    //     });

    //     const resultado: ProductoRefrigeradorDTO[] = existencias.map((productoRefrigerador) => ({
    //         idRefrigerador: productoRefrigerador.id_refrigerador,
    //         marcaNombre: productoRefrigerador.Refrigerador?.marca_nombre || 'Desconocido',
    //         cantidad: productoRefrigerador.cantidad,
    //     }));

    //     return resultado;
    // }
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