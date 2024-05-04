import { ILugar, LugarModel } from "../models/lugar";

export const create = async (lugar: Partial<ILugar>) => {
    return await LugarModel.create(lugar);
};

export const getById = async (id: string) => {
    return await LugarModel.findById(id);
};

export const updateById = async (id: string, lugar: Partial<ILugar>) => {
    return await LugarModel.findByIdAndUpdate(id, lugar, { new: true });
};

export const deleteById = async (id: string) => {
    return await LugarModel.findByIdAndDelete(id);
};

//maltinha eu tive de criar várias funções de serviço para uma melhor organização. 
//uma vez que cada função te uma responsabilidade unica por assim dizer
// Ass:Pedro

