export const validarInventario = (producto: any) => {
    if (producto.stock > 0) {
      return true;
    } else {
      console.log(`Producto sin stock: ${producto.nombre}`);
      return false;
    }
  };
  
  export const validarPrecio = (producto: any) => {
    if (producto.precio > 0) {
      return true;
    } else {
      console.log(`Producto sin precio válido: ${producto.nombre}`);
      return false;
    }
  };
  
  export const pipelineValidacion = (producto: any) => {
    return validarInventario(producto) && validarPrecio(producto);
  };
  