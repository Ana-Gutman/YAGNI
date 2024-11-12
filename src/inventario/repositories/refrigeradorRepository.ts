import { Local } from "../../shared/models/local";
import { MarcaRefrigerador } from "../../shared/models/marcaRefrigerador";
import { Producto } from "../../shared/models/producto";
import { ProductoRefrigerador } from "../../shared/models/productoRefrigerador";
import { Refrigerador } from "../../shared/models/refrigerador";
import { RefrigeradorDTO } from "../dto/RefrigeradorDto";

// interface RefrigeradorFilter {

// }

class RefrigeradorRepository {
    async findAll(): Promise<Refrigerador[]> {
        return Refrigerador.findAll();
    }
  
    async findById(id: number): Promise<Refrigerador | null> {
        return await Refrigerador.findByPk(id);
    }
  
    async create(refrigeradorDto: RefrigeradorDTO): Promise<Refrigerador | null>    {
        const refrigerador = { ...refrigeradorDto };
        const marca = await MarcaRefrigerador.findByPk(refrigeradorDto.marca);
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

    async putProductoInRefrigerador(id_refrigerador: number, id_producto: number, cantidad: number) : Promise< ProductoRefrigerador | null> {
        const producto = await Producto.findByPk(id_producto);
        const refrigerador = await Refrigerador.findByPk(id_refrigerador);
        if (!producto || !refrigerador) return null;
        
        const productoEnRefrigerador = await ProductoRefrigerador.findOne({
          where: { id_refrigerador, id_producto },
        });
        if (!productoEnRefrigerador)  return null;

        productoEnRefrigerador.cantidad += cantidad;
        await productoEnRefrigerador.save(); 
        return productoEnRefrigerador;
    }

    async takeProductoFromRefrigerador(id_refrigerador: number, id_producto: number, cantidad: number) : Promise< ProductoRefrigerador | null> {
        const producto = await Producto.findByPk(id_producto);
        const refrigerador = await Refrigerador.findByPk(id_refrigerador);
        if (!producto || !refrigerador) return null;

        const productoEnRefrigerador = await ProductoRefrigerador.findOne({
          where: { id_refrigerador, id_producto },
        });
        if (!productoEnRefrigerador)  return null;

        if (productoEnRefrigerador.cantidad < cantidad) //TODO: que avise controlador
            cantidad = productoEnRefrigerador.cantidad;

        productoEnRefrigerador.cantidad -= cantidad;
        await productoEnRefrigerador.save(); 
        return productoEnRefrigerador;
    }

}

export { RefrigeradorRepository };
