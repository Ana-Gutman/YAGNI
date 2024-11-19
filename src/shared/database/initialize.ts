import { Camioneta } from "../models/camioneta";
import { Cocina } from "../models/cocina";
import { Local } from "../models/local";
import { Producto } from "../models/producto";
import { Refrigerador } from "../models/refrigerador";
import { MarcaRefrigerador } from "../models/marcaRefrigerador";
import { Cliente } from "../models/cliente";
import { MedioPago } from "../models/medioPago";
import { startListeningForLotes } from "../../inventario/queues/camionetaSubscriber";
import { startListeningForPedidos } from "../../inventario/queues/cocinaSubscriber";
import { CocinaCamioneta } from "../models/cocinaCamioneta";
import { CocinaLocal } from "../models/cocinaLocal";

export async function loadEntidades() {
    const cocinas = [
        { id_cocina: 1, direccion: "dir" },
        { id_cocina: 2, direccion: "dir" },
        { id_cocina: 3, direccion: "dir" }
    ];

    for (const { id_cocina, direccion } of cocinas) {
        await Cocina.create({ id_cocina, direccion });
    }
    
    const camionetas = [
        { id_camioneta: 1, matricula: 'ABC-123' },
        { id_camioneta: 2, matricula: 'DEF-456' },
        { id_camioneta: 3, matricula: 'GHI-789' }
    ];  

    for (const { id_camioneta, matricula } of camionetas) {
        await Camioneta.create({ id_camioneta, matricula });
    }
    
    const cocinaCamionetas = [
        { id_cocina: 1, id_camioneta: 1 },
        { id_cocina: 1, id_camioneta: 2 },
        { id_cocina: 2, id_camioneta: 3 }
      ];
    
      for (const { id_cocina, id_camioneta } of cocinaCamionetas) {
        await CocinaCamioneta.create({ id_cocina, id_camioneta });
      }

    const productos = [
        { id_producto: 1, nombre: 'producto1', precio_lista: 100 },
        { id_producto: 2, nombre: 'producto2', precio_lista: 200 },
    ];

    for (const { id_producto, nombre, precio_lista } of productos) {
        await Producto.create({ id_producto, nombre, precio_lista });
    }

    const MarcaRefrigeradores = [
        { nombre: 'sony', tipo_codigo: 'QR' },
    ];

    for (const { nombre, tipo_codigo } of MarcaRefrigeradores) {
        await MarcaRefrigerador.create({ nombre, tipo_codigo });
    }

    const refrigeradores = [
        { id_refrigerador: 1, id_local: 1, marca_nombre: 'sony' },
        { id_refrigerador: 2, id_local: 1, marca_nombre: 'sony' },
    ];

    const locales = [
        { id_local: 1, nombre:'local1', direccion: 'dir' },
        { id_local: 2, nombre: 'local2', direccion: 'dir' },
        { id_local: 3, nombre: 'local3', direccion: 'dir' }
    ];

    for (const { id_local, nombre, direccion } of locales) {
        await Local.create({ id_local, nombre, direccion });
    }

    const cocinaLocales = [ //a cada local le corresponde solo una cocina
        { id_cocina: 1, id_local: 1 },
        { id_cocina: 2, id_local: 2 },
        { id_cocina: 2, id_local: 3 }
    ];

    for (const { id_cocina, id_local } of cocinaLocales) {
        await CocinaLocal.create({ id_cocina, id_local });
    }


    for (const { id_refrigerador, id_local, marca_nombre } of refrigeradores) {
        await Refrigerador.create({ id_refrigerador, id_local, marca_nombre });
    }

    const mediosPago = [
        { id_medio_pago: 1, nombre: 'efectivo' },
        { id_medio_pago: 2, nombre: 'tarjeta' },
    ];

    const clientes = [
        { id_cliente: 1, nombre: 'cliente1', direccion: 'dir' },
        { id_cliente: 2, nombre: 'cliente2', direccion: 'dir' },
    ];

    for (const { id_cliente, nombre, direccion } of clientes) {
        await Cliente.create({ id_cliente, nombre, direccion });
    }

    for (const { id_medio_pago, nombre } of mediosPago) {
        await MedioPago.create({ id_medio_pago, nombre });
    }

  
}

export async function startCamionetaQueues ()  {
    const camionetas = await Camioneta.findAll();  
      camionetas.forEach(camioneta => {
        startListeningForLotes(camioneta.id_camioneta);
    });
}

export async function startCocinaQueues() {
    const cocinas = await Cocina.findAll();
    cocinas.forEach(cocina => {
        startListeningForPedidos(cocina.id_cocina); 
    });
}

