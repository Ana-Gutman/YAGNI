import { Camioneta } from "../shared/models/camioneta";
import { Cocina } from "../shared/models/cocina";
import { getCamionetaById } from "./services/camionetaService";
import { getCocinaById } from "./services/cocinaService";

export const X = 10;
export const H = 60;
export let ActualCamioneta = 1;
export let ActualCocina = 1;

export const siguienteCamioneta = async () => {
    const camionetas = await Camioneta.count();
    if (ActualCamioneta == camionetas) {
        ActualCamioneta = 1;
    } else {
        ActualCamioneta++;
    }

    if (!await getCamionetaById(ActualCamioneta)){ 
        await siguienteCamioneta();
    }
};

export const siguienteCocina = async () => {
    const cocinas = await Cocina.count();
    if (ActualCocina == cocinas) {
        ActualCocina = 1;
    } else {
        ActualCocina++;
    }

    if (!await getCocinaById(ActualCocina)) {
        await siguienteCocina();
    }
};