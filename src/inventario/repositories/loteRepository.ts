import { InvalidValueError } from "../../shared/errors";
import { Cocina } from "../../shared/models/cocina";
import { Local } from "../../shared/models/local";
import { Lote } from "../../shared/models/lote";
import { Producto } from "../../shared/models/producto";
import { Refrigerador } from "../../shared/models/refrigerador";
import { LoteDTO, LoteUpdateCantidadDto, LoteUpdateRetiroDto } from "../dto/LoteDto";

const X=10;

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


    async updateCantidad(id: number, loteUpdateCantidadDto: LoteUpdateCantidadDto) : Promise<Lote | null>{
        const lote = await Lote.findByPk(id);
        if (!lote) return null;
        lote.cantidad += loteUpdateCantidadDto.cantidad;
        if(loteUpdateCantidadDto.cantidad + lote.cantidad > X)
            lote.cantidad= X;
        await lote.save();
        return lote;
    }

    async findAll(): Promise<Lote[]> {
        return Lote.findAll();
    }
  
    async findById(id: number): Promise<Lote | null> {
        return await Lote.findByPk(id);
    }
  
    async create(loteDto: LoteDTO): Promise<Lote | null> {
        loteDto.entregado = false;
        const lote = { ...loteDto };
        const cocina = await Cocina.findByPk(loteDto.id_cocina);
        const local = await Local.findByPk(loteDto.id_local_destino);
        const producto = await Producto.findByPk(loteDto.id_producto);
        const refrigerador = await Refrigerador.findByPk(loteDto.id_refrigerador);
        if (!cocina || !local || !producto || !refrigerador) {
            return null;
        }
        return Lote.create(lote);  
    }
  
    async delete(id: number): Promise<number> {
        return Lote.destroy({
            where: { id_lote: id },
        });
    }
}

export { LoteRepository };
