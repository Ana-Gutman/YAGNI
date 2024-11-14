import { Camioneta } from "../models/camioneta";
import { Cocina } from "../models/cocina";
import { CocinaCamioneta } from "../models/cocinaCamioneta";

export async function loadCocinaCamionetas() {
    const cocinas = [
        { id_cocina: 1, direccion: "dir" },
        { id_cocina: 2, direccion: "dir" }
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
  
}


