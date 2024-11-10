import { Producto } from '../../shared/models/producto';
import { ProductoDTO } from '../dto/ProductoDto';

export const findAllProductos = async () => {
    return await Producto.findAll();
}

export const findProductoById = async (id: number) => {
    return await Producto.findByPk(id);
}

export const createProducto = async (productoDto: ProductoDTO) => {
    if (!productoDto) throw new Error('ProductoDTO is null');
    const producto = { ...productoDto };
    return await Producto.create(producto);
}

export const updateProducto = async (id: number, productoDto: ProductoDTO) => {
    if (!productoDto) throw new Error('ProductoDTO is null');
    return await Producto.update(productoDto, { where: { id_producto: id } });
}

export const deleteProducto = async (id: number) => {
    return await Producto.destroy({ where: { id_producto: id } });
}



