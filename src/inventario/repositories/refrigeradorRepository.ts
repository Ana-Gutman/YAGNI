import { Local } from "../../shared/models/local";
import { MarcaRefrigerador } from "../../shared/models/marcaRefrigerador";
import { Producto } from "../../shared/models/producto";
import { ProductoRefrigerador } from "../../shared/models/productoRefrigerador";
import { Refrigerador } from "../../shared/models/refrigerador";
import { RefrigeradorDTO } from "../dto/RefrigeradorDto";
import { ProductoDTO } from "../dto/ProductoDto"; 
import { InsufficientStockError, NotFoundError } from "../../shared/utils/customErrors";

class RefrigeradorRepository {
    async findAll(): Promise<Refrigerador[]> {
        return Refrigerador.findAll();
    }

    async findById(id: number): Promise<Refrigerador | null> {
        return await Refrigerador.findByPk(id);
    }

    async create(refrigeradorDto: RefrigeradorDTO): Promise<Refrigerador | null> {
        const refrigerador = { ...refrigeradorDto };
        const marca = await MarcaRefrigerador.findByPk(refrigeradorDto.marca_nombre);
        const local = await Local.findByPk(refrigeradorDto.id_local);
        if (!marca || !local) {
            return null;
        }
        return Refrigerador.create(refrigerador);  
    }

    async update(id: number, refrigeradorDto: RefrigeradorDTO): Promise<Refrigerador | null> {
        await Refrigerador.update(refrigeradorDto, {
            where: { id_refrigerador: id },
        });
        return this.findById(id);
    }

    async delete(id: number): Promise<number> {
        return Refrigerador.destroy({
            where: { id_refrigerador: id },
        });
    }

    async findByLocalId(idLocal: string): Promise<Refrigerador[]> {
        return await Refrigerador.findAll({
            where: { id_local: idLocal },
            include: [{ model: Local, attributes: ['id_local', 'nombre'] }],
        });
    }

    async actualizarInventario(idRefrigerador: string, productos: ProductoDTO[]): Promise<void> {
        for (const producto of productos) {
            const { id_producto, cantidad } = producto;
    
            let productoEnRefrigerador = await ProductoRefrigerador.findOne({
                where: { id_refrigerador: idRefrigerador, id_producto },
            });

            if (!productoEnRefrigerador) {
                await ProductoRefrigerador.create({
                    id_refrigerador: idRefrigerador, 
                    id_producto,
                    cantidad,
                });
            } else {
                productoEnRefrigerador.cantidad += cantidad;
                await productoEnRefrigerador.save();
            }
        }
    }


    async retirarInventario(idRefrigerador: string, productos: ProductoDTO[]): Promise<void> {
        for (const producto of productos) {
          const { id_producto, cantidad } = producto;
      
          const productoEnRefrigerador = await ProductoRefrigerador.findOne({
            where: { id_refrigerador: idRefrigerador, id_producto },
          });
      
          if (!productoEnRefrigerador) {
            throw new NotFoundError(`El producto con ID ${id_producto} no se encuentra en el refrigerador`);
          }
      
          if (productoEnRefrigerador.cantidad < cantidad) {
            throw new InsufficientStockError(`Stock insuficiente para el producto con ID ${id_producto}`);
          }
      
          productoEnRefrigerador.cantidad -= cantidad;
          await productoEnRefrigerador.save();
        }
      }
      
    
}

export { RefrigeradorRepository };
