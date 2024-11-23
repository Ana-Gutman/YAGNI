import { Local } from "../../shared/models/local";
import { MarcaRefrigerador } from "../../shared/models/marcaRefrigerador";
import { Producto } from "../../shared/models/producto";
import { ProductoRefrigerador } from "../../shared/models/productoRefrigerador";
import { Refrigerador } from "../../shared/models/refrigerador";
import { RefrigeradorDTO } from "../dto/RefrigeradorDto";
import { ProductoDTO } from "../dto/ProductoDto";
import { InsufficientStockError, NotFoundError } from "../../shared/utils/customErrors";
import { MovimientoRefrigerador } from "../../shared/models/movimientoRefrigerador";
import { Op } from "sequelize";
import { ExistenciasDTO } from "../dto/ExistenciasDto";

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

    async registrarAlarma(idRefrigerador: string, idProducto: string, cantidad: number): Promise<void> {
        await MovimientoRefrigerador.create({
            id_refrigerador: idRefrigerador,
            id_producto: idProducto,
            cantidad_cambiada: -cantidad, // Se intenta retirar más de lo permitido
            accion: 'ALARMA_EMITIDA',
            fecha: new Date(),
        });
    }

    async findProductosByRefrigerador(idRefrigerador: string): Promise<ProductoRefrigerador[]> {
        return await ProductoRefrigerador.findAll({
            where: { id_refrigerador: idRefrigerador },
            include: [
                {
                    model: Producto,
                    as: 'Producto', // Debe coincidir con el alias en `setRelationships`
                    attributes: ['id_producto', 'nombre'], // Solo los campos necesarios
                },
            ],
        });
    }
    
    async findProductoEnRefrigerador(idRefrigerador: string, idProducto: string): Promise<ProductoRefrigerador | null> {
        return await ProductoRefrigerador.findOne({
            where: {
                id_refrigerador: idRefrigerador,
                id_producto: idProducto,
            },
        });
    }
    
    
    async findRefrigeradoresOfLocal(idLocal: number): Promise<Refrigerador[]> {
        return await Refrigerador.findAll({
            where: { id_local: idLocal },
            include: [{ model: Local, attributes: ['id_local', 'nombre'] }],
        });
    }

    async findRefirgeradorWithProductoInLocal(idLocal: number, id_producto: number): Promise<Refrigerador[]> {
        const refrigeradores = await this.findRefrigeradoresOfLocal(idLocal);
    
        const refrigeradoresConProducto = await Promise.all(
            refrigeradores.map(async (refrigerador) => {
                const producto = await ProductoRefrigerador.findOne({
                    where: { id_refrigerador: refrigerador.id_refrigerador, id_producto },
                });
                return producto ? refrigerador : null;
            })
        );
        const refriConProducto = refrigeradoresConProducto.filter(Boolean) as Refrigerador[];
        return refriConProducto;
    }
    

    async actualizarInventario(idRefrigerador: string, productos: ProductoDTO[]): Promise<void> {
        for (const producto of productos) {
            const { id_producto, cantidad_cambiada } = producto;

            let productoEnRefrigerador = await ProductoRefrigerador.findOne({
                where: { id_refrigerador: idRefrigerador, id_producto },
            });

            if (!productoEnRefrigerador) {
                await ProductoRefrigerador.create({
                    id_refrigerador: idRefrigerador,
                    id_producto,
                    cantidad: cantidad_cambiada,

                });
            } else {
                productoEnRefrigerador.cantidad += cantidad_cambiada;

                await MovimientoRefrigerador.create({
                    id_producto: id_producto,
                    id_refrigerador: idRefrigerador,
                    cantidad_cambiada,
                    fecha: new Date() 
                });

                await productoEnRefrigerador.save();
            }
        }
    }


    async retirarInventario(idRefrigerador: string, productos: ProductoDTO[]): Promise<void> {
        for (const producto of productos) {
            const { id_producto, cantidad_cambiada } = producto;

            const productoEnRefrigerador = await ProductoRefrigerador.findOne({
                where: { id_refrigerador: idRefrigerador, id_producto },
            });

            if (!productoEnRefrigerador) {
                throw new NotFoundError(`El producto con ID ${id_producto} no se encuentra en el refrigerador`);
            }

            if (productoEnRefrigerador.cantidad < cantidad_cambiada) {
                throw new InsufficientStockError(`Stock insuficiente para el producto con ID ${id_producto}`);
            }

            productoEnRefrigerador.cantidad -= cantidad_cambiada;

            console.log("cantidad_cambiada", cantidad_cambiada)
            await MovimientoRefrigerador.create({
                id_producto: id_producto,
                id_refrigerador: idRefrigerador,
                cantidad_cambiada,
                fecha: new Date(),

            });

            await productoEnRefrigerador.save();
        }
    }

    async ListarExistenciasPorProducto(idProducto: number, fInicio?: Date, fFin?: Date): Promise<ExistenciasDTO[]> {
        const existenciasActuales = await ProductoRefrigerador.findAll({
            where: { id_producto: idProducto },
            include: [{ model: Refrigerador, attributes: ['id_refrigerador'] }],
        });

        if (!fInicio && !fFin) {
            return existenciasActuales.map((estado) => {
                return new ExistenciasDTO(
                    estado.id_refrigerador,
                    [{ fecha: new Date(), existencia: estado.cantidad }]
                );
            });
        }

        const movimientos = await MovimientoRefrigerador.findAll({
            where: {
                id_producto: idProducto,
                fecha: {
                    [Op.between]: [fInicio, fFin],
                },
            },
            include: [{ model: Refrigerador, attributes: ['id_refrigerador'] }],
            order: [['fecha', 'ASC']],
        });

        const existenciasHistorial = existenciasActuales.map((estado) => {
            const id_refrigerador = estado.id_refrigerador;

            const movimientosRefrigerador = movimientos.filter(
                (mov) => mov.id_refrigerador === id_refrigerador
            );

            let existencia = estado.cantidad; // Estado actual
            const historial = movimientosRefrigerador.map((mov) => {
                existencia += mov.cantidad_cambiada; // Actualizar existencia
                return {
                    fecha: mov.fecha,
                    existencia,
                };
            });

            return new ExistenciasDTO(id_refrigerador, historial);
        });

        return existenciasHistorial;
    }

}

export { RefrigeradorRepository };
