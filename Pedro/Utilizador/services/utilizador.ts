import { IUtilizador, UtilizadorModel } from "../models/utilizador";

export const create = async (utilizador: Partial<IUtilizador>) => {
    return await UtilizadorModel.create(utilizador);
};

export const getById = async (id: string) => {
    return await UtilizadorModel.findById(id);
};

export const updateById = async (id: string, utilizador: Partial<IUtilizador>) => {
    return await UtilizadorModel.findByIdAndUpdate(id, utilizador, { new: true });
};

export const deleteById = async (id: string) => {
    return await UtilizadorModel.findByIdAndDelete(id);
};



//maltinha eu tive de criar várias funções de serviço para uma melhor organização. 
//uma vez que cada função te uma responsabilidade unica por assim dizer
// Ass:Pedro

