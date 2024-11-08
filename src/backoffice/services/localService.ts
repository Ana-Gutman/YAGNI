import { Local } from "../../shared/models/local";
import { LocalDTO } from "../dto/LocalDto";

export const findAllLocales = async () => {
    return await Local.findAll();
}

export const findLocalById = async (id: number) => {
    return await Local.findByPk(id);
}

export const createLocal = async (localDto: LocalDTO) => {
    if (!localDto) throw new Error('LocalDTO is null');
    const local = { ...localDto };
    return await Local.create(local);
}

export const updateLocal = async (id: number, localDto: LocalDTO) => {
    if (!localDto) throw new Error('LocalDTO is null');
    return await Local.update(localDto, { where: { id_local: id } });
}

export const deleteLocal = async (id: number) => {
    return await Local.destroy({ where: { id_local: id } });
}

