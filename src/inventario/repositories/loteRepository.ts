import { InvalidValueError } from "../../shared/errors/customErrors";
import { Cocina } from "../../shared/models/cocina";
import { Local } from "../../shared/models/local";
import { Lote } from "../../shared/models/lote";
import { Producto } from "../../shared/models/producto";
import { ProductoEnvasado } from "../../shared/models/productoEnvasado";
import { Refrigerador } from "../../shared/models/refrigerador";
import { LoteDTO,LoteUpdateRetiroDto } from "../dto/LoteDto";
import { X } from "../config";

class LoteRepository {
    async updateEntrega(id: number): Promise<Lote | null> {
        const lote = await Lote.findByPk(id);
        if (!lote) return null;
        if (lote.fecha_retirado == null)
            throw new InvalidValueError("entregado", "true", "el lote debe tener fecha de retiro para poder ser entregado");
        lote.entregado = true;
        await lote.save();
        return lote;
    }

    async updateRetiro(id: number, loteUpdateRetiroDto: LoteUpdateRetiroDto): Promise<Lote | null> {
        const lote = await Lote.findByPk(id);
        const fecha_retiro = loteUpdateRetiroDto.fecha_retirado.toString();
        if (!lote) return null;
        if (lote.cantidad < X) 
            throw new InvalidValueError("fecha_retirado", fecha_retiro, "el lote debe estar lleno para poder ser retirado");
        lote.fecha_retirado = loteUpdateRetiroDto.fecha_retirado;
        await lote.save();
        return lote;
    }

    async findAll(): Promise<Lote[]> {
        return Lote.findAll();
    }
  
    async findById(id: number): Promise<Lote | null> {
        return await Lote.findByPk(id);
    }
  
    async create(loteDto: LoteDTO): Promise<{ lote: Lote, productosEnvasados: ProductoEnvasado[] } | null> {
        loteDto.cantidad = X;
        loteDto.fecha_retirado = null;
        loteDto.entregado = false;
        const lote = { ...loteDto };

        const cocina = await Cocina.findByPk(loteDto.id_cocina);
        const local = await Local.findByPk(loteDto.id_local_destino);
        const producto = await Producto.findByPk(loteDto.id_producto);
        const refrigerador = await Refrigerador.findByPk(loteDto.id_refrigerador);
        if (!cocina || !local || !producto || !refrigerador) {
            return null;
        }

        const loteCreado = await Lote.create(lote);
        let productosEnvasados: ProductoEnvasado[] = [];

        if (loteCreado) {  
            productosEnvasados = await this.crearXProductosEnvasados(loteCreado, refrigerador);
        }

        return { lote: loteCreado, productosEnvasados: productosEnvasados };
    }

    async crearXProductosEnvasados(lote: Lote, refrigerador: Refrigerador): Promise<ProductoEnvasado[]> {
        const marcaRefrigerador = await refrigerador.getMarcaRefrigerador();
        const productosEnvasados: ProductoEnvasado[] = [];
        for (let i = 0; i < X; i++) {
            const productoEnvasadoData  = {
                id_lote: lote.id_lote,
                id_producto: lote.id_producto,
                id_cocina: lote.id_cocina,
                codigo: marcaRefrigerador.tipo_codigo
            };
            console.log(productoEnvasadoData);
            const productoEnvasado = await ProductoEnvasado.create(productoEnvasadoData);
            productosEnvasados.push(productoEnvasado);
        }
        return productosEnvasados;
    }
  
    async delete(id: number): Promise<number> {
        return Lote.destroy({
            where: { id_lote: id },
        });
    }
}

export { LoteRepository };
