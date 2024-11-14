import { Camioneta } from "../shared/models/camioneta";

export const X = 10;
export const H = 60;
export let ActualCamioneta = 1;
export let ActualCocina = 1;

export const siguienteCamioneta = async () => {
    const camioneta = await Camioneta.count();
    if (ActualCamioneta == camioneta) {
        ActualCamioneta = 1;
    } else {
        ActualCamioneta++;
    }
    return ActualCamioneta;
};