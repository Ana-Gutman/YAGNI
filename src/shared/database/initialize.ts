import { Camioneta } from "../models/camioneta";
import { Cocina } from "../models/cocina";
import { Local } from "../models/local";
import { Producto } from "../models/producto";
import { Refrigerador } from "../models/refrigerador";
import { MarcaRefrigerador } from "../models/marcaRefrigerador";
import { MedioPago } from "../models/medioPago";
import { ProductoRefrigerador } from "../models/productoRefrigerador";
import { CocinaCamioneta } from "../models/cocinaCamioneta";
import { CocinaLocal } from "../models/cocinaLocal";
import { createUsuario } from "../../usuarioClientes/services/usuarioService";
import { UsuarioDTO } from "../../usuarioClientes/dto/UsuarioDto";
import { Server as WebSocketServer } from "socket.io";
import { startListeningForLotes } from "../../inventario/queues/camionetaSubscriber";
import { startListeningForPedidos } from "../../inventario/queues/cocinaSubscriber";
import { faker } from '@faker-js/faker';

export async function loadEntidades() {
    // Locales
    const locales = Array.from({ length: 5 }, (_, i) => ({
        id_local: i + 1,
        nombre: `Local ${i + 1}`,
        direccion: `Avenida Principal ${i + 1}`,
    }));
    for (const { id_local, nombre, direccion } of locales) {
        await Local.create({ id_local, nombre, direccion });
    }

    // Marca Refrigeradores
    const marcas = [
        { nombre: "Samsung", tipo_codigo: "QR" },
        { nombre: "LG", tipo_codigo: "NFC" },
        { nombre: "Whirlpool", tipo_codigo: "QR" },
        { nombre: "Bosch", tipo_codigo: "NFC" },
        { nombre: "Sony", tipo_codigo: "QR" },
    ];
    for (const { nombre, tipo_codigo } of marcas) {
        await MarcaRefrigerador.create({ nombre, tipo_codigo });
    }

    // Refrigeradores
    const refrigeradores = Array.from({ length: 10 }, (_, i) => ({
        id_refrigerador: i + 1,
        id_local: locales[i % locales.length].id_local, // Asegura que id_local exista
        marca_nombre: marcas[i % marcas.length].nombre, // Relación válida con MarcaRefrigerador
    }));
    for (const { id_refrigerador, id_local, marca_nombre } of refrigeradores) {
        await Refrigerador.create({ id_refrigerador, id_local, marca_nombre });
    }

    // Producto-Refrigeradores con Cantidad 0
    const productos = Array.from({ length: 10 }, (_, i) => ({
        id_producto: i + 1,
        nombre: `Producto ${i + 1}`,
        precio_lista: 50 * (i + 1),
    }));
    for (const { id_producto, nombre, precio_lista } of productos) {
        await Producto.create({ id_producto, nombre, precio_lista });
    }

    const productosRefrigeradores = productos.flatMap((producto, i) => [
        {
            id_refrigerador: refrigeradores[i % refrigeradores.length].id_refrigerador, // Relación válida
            id_producto: producto.id_producto,
            cantidad: Math.random() > 0.5 ? 0 : Math.floor(Math.random() * 20 + 1), // Algunos con cantidad 0
        },
    ]);
    for (const { id_refrigerador, id_producto, cantidad } of productosRefrigeradores) {
        await ProductoRefrigerador.create({ id_refrigerador, id_producto, cantidad });
    }

    // Cocinas
    const cocinas = Array.from({ length: 5 }, (_, i) => ({
        id_cocina: i + 1,
        direccion: `Calle ${i + 1}, Ciudad ${i + 1}`,
    }));
    for (const { id_cocina, direccion } of cocinas) {
        await Cocina.create({ id_cocina, direccion });
    }

    // Cocina-Locales Relaciones
    const cocinaLocales = locales.map((local, i) => ({
        id_cocina: (i % cocinas.length) + 1,
        id_local: local.id_local,
    }));
    for (const { id_cocina, id_local } of cocinaLocales) {
        await CocinaLocal.create({ id_cocina, id_local });
    }

    // Camionetas
    const camionetas = Array.from({ length: 5 }, (_, i) => ({
        id_camioneta: i + 1,
        matricula: `MAT-${1000 + i}`,
    }));
    for (const { id_camioneta, matricula } of camionetas) {
        await Camioneta.create({ id_camioneta, matricula });
    }

    // Cocina-Camioneta Relaciones
    const cocinaCamionetas = Array.from({ length: 5 }, (_, i) => ({
        id_cocina: i + 1,
        id_camioneta: i + 1,
    }));
    for (const { id_cocina, id_camioneta } of cocinaCamionetas) {
        await CocinaCamioneta.create({ id_cocina, id_camioneta });
    }

    // Medios de Pago
    const mediosPago = ["PayPal", "Mercado Pago", "Transferencia", "Tarjeta"].map((medio, i) => ({
        id_medio_pago: i + 1,
        nombre: medio,
    }));
    for (const { id_medio_pago, nombre } of mediosPago) {
        await MedioPago.create({ id_medio_pago, nombre });
    }

    // Usuarios
    const usuarios = [
        { nombre: "Admin User", email: "admin@example.com", contraseña: "Admin1234!", rol: "Admin" },
        { nombre: "Cliente 1", email: "cliente1@example.com", contraseña: "Cliente1234!", rol: "Cliente", celular: "099999001", idPrimerMedioPago: 1 },
        { nombre: "Cliente 2", email: "cliente2@example.com", contraseña: "Cliente1234!", rol: "Cliente", celular: "099999002", idPrimerMedioPago: 2 },
        { nombre: "Supervisor Cocina", email: "supervisor@example.com", contraseña: "Supervisor1234!", rol: "Supervisor Cocina", id_cocina: 1 },
        { nombre: "Repartidor", email: "repartidor@example.com", contraseña: "Repartidor1234!", rol: "Repartidor", id_camioneta: 1 },
        { nombre: "Dispositivo", email: "dispositivo@example.com", contraseña: "Dispositivo1234!", rol: "Dispositivo" },
    ];
    for (const usuario of usuarios) {
        await createUsuario(new UsuarioDTO(0, usuario.nombre, usuario.rol, usuario.email, usuario.contraseña, usuario.celular, usuario.idPrimerMedioPago, usuario.id_cocina));
    }


}

export async function loadFakeData() {
    // Generar cocinas
    const cocinas = [];
    for (let i = 1; i <= 50; i++) {
        cocinas.push({ id_cocina: i, direccion: faker.location.streetAddress() });
    }
    await Cocina.bulkCreate(cocinas);

    // Generar camionetas
    const camionetas = [];
    for (let i = 1; i <= 10; i++) {
        camionetas.push({ id_camioneta: i, matricula: faker.vehicle.vrm() });
    }
    await Camioneta.bulkCreate(camionetas);

    // Relacionar cocinas y camionetas
    const cocinaCamionetas = [];
    for (const cocina of cocinas.slice(0, 10)) {
        const camioneta = faker.helpers.arrayElement(camionetas);
        cocinaCamionetas.push({ id_cocina: cocina.id_cocina, id_camioneta: camioneta.id_camioneta });
    }
    await CocinaCamioneta.bulkCreate(cocinaCamionetas);


    // Generar locales
    const locales = [];
    for (let i = 1; i <= 200; i++) {
        locales.push({ id_local: i, nombre: `Local-${i}`, direccion: faker.location.streetAddress() });
    }
    await Local.bulkCreate(locales);

    // Relacionar cocinas y locales
    const cocinaLocales = [];
    const usados = new Set(); // Conjunto para rastrear los locales ya asignados

    for (const cocina of cocinas) {
        let local;
        do {
            // Escoge un local aleatorio
            local = faker.helpers.arrayElement(locales);
        } while (usados.has(local.id_local)); // Asegúrate de que no se repita el id_local

        // Añade el id_local al conjunto para evitar repeticiones
        usados.add(local.id_local);

        // Añadir la relación cocina-local
        cocinaLocales.push({ id_cocina: cocina.id_cocina, id_local: local.id_local });
    }

    // Insertar las relaciones de cocina-local
    await CocinaLocal.bulkCreate(cocinaLocales);

    // Generar marca de refrigeradores
    const marcasRefrigeradores = [
        { nombre: 'Sony', tipo_codigo: 'QR' },
        { nombre: 'LG', tipo_codigo: 'NFC' }
    ];
    await MarcaRefrigerador.bulkCreate(marcasRefrigeradores);

    // Generar refrigeradores
    const refrigeradores = [];
    for (let i = 1; i <= locales.length * 8; i++) {
        const local = faker.helpers.arrayElement(locales);
        const marca = faker.helpers.arrayElement(marcasRefrigeradores);
        refrigeradores.push({ id_refrigerador: i, id_local: local.id_local, marca_nombre: marca.nombre });
    }
    await Refrigerador.bulkCreate(refrigeradores);

    // Generar productos
    const productos = [];
    for (let i = 1; i <= 10; i++) {
        productos.push({ id_producto: i, nombre: faker.commerce.productName(), precio_lista: parseFloat(faker.commerce.price()) });
    }
    await Producto.bulkCreate(productos);

    // Relacionar productos y refrigeradores
    const productosRefrigeradores = [];
    for (const producto of productos) {
        const refrigeradoresDelLocal = refrigeradores.slice(0, 4); // Simula solo 4 refrigeradores
        for (const refrigerador of refrigeradoresDelLocal) {
            productosRefrigeradores.push({ id_refrigerador: refrigerador.id_refrigerador, id_producto: producto.id_producto, cantidad: faker.number.int({ min: 0, max: 100 }) });
        }
    }
    await ProductoRefrigerador.bulkCreate(productosRefrigeradores);

    // Generar medios de pago
    const mediosPago = [
        { id_medio_pago: 1, nombre: 'PayPal' },
        { id_medio_pago: 2, nombre: 'Mercado Pago' },
        { id_medio_pago: 3, nombre: 'Transferencia' }
    ];
    await MedioPago.bulkCreate(mediosPago);


    // Generar usuarios
    for (let i = 1; i <= 10001; i++) {
        const usuario = new UsuarioDTO(
            0,
            faker.person.firstName(),
            faker.helpers.arrayElement(['Admin', 'Cliente', 'Repartidor', 'Supervisor Cocina', 'Supervisor Local', 'Dispositivo']),
            faker.internet.email(),
            faker.internet.password({ length: 13, memorable: true }),
            faker.phone.number(),
            faker.helpers.arrayElement([1, 2, 3]),
            faker.helpers.arrayElement(cocinas).id_cocina
        );
        await createUsuario(usuario);
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


export async function cargarUsuario () {

    const cocinas = await Cocina.findAll();
    for (let i = 1; i <= 10001; i++) {
        const usuario = new UsuarioDTO(
            0,
            faker.person.firstName(),
            faker.helpers.arrayElement(['Admin', 'Cliente', 'Repartidor', 'Supervisor Cocina', 'Supervisor Local', 'Dispositivo']),
            faker.internet.email(),
            faker.internet.password({ length: 13, memorable: true }),
            faker.phone.number(),
            faker.helpers.arrayElement([1, 2, 3]),
            faker.helpers.arrayElement(cocinas).id_cocina
        );
        await createUsuario(usuario);
    }

}


