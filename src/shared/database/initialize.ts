import { Camioneta } from "../models/camioneta";
import { Cocina } from "../models/cocina";
import { Local } from "../models/local";
import { Producto } from "../models/producto";
import { Refrigerador } from "../models/refrigerador";
import { MarcaRefrigerador } from "../models/marcaRefrigerador";
import { MedioPago } from "../models/medioPago";
import { startListeningForLotes } from "../../inventario/queues/camionetaSubscriber";
import { startListeningForPedidos } from "../../inventario/queues/cocinaSubscriber";
import { CocinaCamioneta } from "../models/cocinaCamioneta";
import { CocinaLocal } from "../models/cocinaLocal";
import { createUsuario } from "../../usuarioClientes/services/usuarioService";
import { UsuarioDTO } from "../../usuarioClientes/dto/UsuarioDto";
import { Server as WebSocketServer } from 'socket.io';
import { ProductoRefrigerador } from "../models/productoRefrigerador";

export async function loadEntidades() { //TODO: CAMBIAR A FAKERS QUE AGREGUEN MUCHOS DATOS
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
        { id_refrigerador: 3, id_local: 2, marca_nombre: 'sony' },
        { id_refrigerador: 4, id_local: 2, marca_nombre: 'sony' },
        { id_refrigerador: 5, id_local: 3, marca_nombre: 'sony' },
        { id_refrigerador: 6, id_local: 3, marca_nombre: 'sony' }
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

    const productosRefrigeradores = [ //Cada producto debe estar en un unico refrigerador por local
        { id_refrigerador: 1, id_producto: 1, cantidad: 0 },
        { id_refrigerador: 2, id_producto: 2, cantidad: 0 },
        { id_refrigerador: 3, id_producto: 1, cantidad: 0 },
        { id_refrigerador: 4, id_producto: 2, cantidad: 0 },
        { id_refrigerador: 5, id_producto: 1, cantidad: 0 },
        { id_refrigerador: 6, id_producto: 2, cantidad: 0 }
    ];

    for (const { id_refrigerador, id_producto, cantidad } of productosRefrigeradores) {
        await ProductoRefrigerador.create({id_refrigerador, id_producto, cantidad});
    }


    const mediosPago = [
        { id_medio_pago: 1, nombre: 'paypal' },
        { id_medio_pago: 2, nombre: 'mercado pago' },
        { id_medio_pago: 3, nombre: 'transferencia' }
    ];

    for (const { id_medio_pago, nombre } of mediosPago) {
        await MedioPago.create({ id_medio_pago, nombre });
    }

    const usuarios = [
        { nombre: 'usuario1', email: 'email1@gmail.com', contraseña: 'Aqwertyu2!!!', rol: 'Admin' },
        { nombre: 'cli1', email: 'email2@gmail.com', contraseña: 'Aqwertyu2!!!', rol: 'Cliente', celular: '093443997', idPrimerMedioPago: 1 },
        { nombre: 'usuario3', email: 'email3@gmail.com', contraseña: 'Aqwertyu2!!!', rol: 'Repartidor', id_camioneta: 1 },
        { nombre: 'usuario4', email: 'email4@gmail.com', contraseña: 'Aqwertyu2!!!', rol: 'Supervisor Cocina', id_cocina: 1 },
        { nombre: 'cli2', email: 'email5@gmail.com', contraseña: 'Aqwertyu2!!!', rol: 'Cliente' , celular: '093443997', idPrimerMedioPago: 2},
        { nombre: 'usuario6', email: 'email6@gmail.com', contraseña: 'Aqwertyu2!!!', rol: 'Dispositivo' }
    ];

    for (const {nombre, email, contraseña, rol, celular, idPrimerMedioPago, id_cocina} of usuarios) {
        const usuario = await createUsuario(new UsuarioDTO(0, nombre, rol, email, contraseña, celular, idPrimerMedioPago, id_cocina));
    }
  
}

export const initializeRabbitMQAndWebSocket = async (io: WebSocketServer) => {
    const cocinas = await Cocina.findAll(); 
    const camionetas = await Camioneta.findAll();  

    cocinas.forEach(cocina => {
      startListeningForPedidos(cocina.id_cocina, (pedidoData) => {
        io.emit('pedido', { id_cocina: cocina.id_cocina, ...pedidoData });
      });
    });

    camionetas.forEach(camioneta => {
        startListeningForLotes(camioneta.id_camioneta, (loteData) => {
          io.emit('lote', { id_camioneta: camioneta.id_camioneta, ...loteData });
        });
    });
}






