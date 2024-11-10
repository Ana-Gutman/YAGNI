export class ProductoDTO{
    public id_producto!: number;
    public nombre!: string;
    public descripcion!: string;
    public ingredientes!: string;
    public precio_lista!: number;
    constructor(id_producto: number, nombre: string, descripcion: string, ingredientes: string, precio_lista: number){
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ingredientes = ingredientes;
        this.precio_lista = precio_lista;
    }
    
}