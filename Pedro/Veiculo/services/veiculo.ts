import { IVeiculo, VeiculoModel } from "../models/veiculo";

export const create = async (veiculo: Partial<IVeiculo>) => {
    return await VeiculoModel.create(veiculo);
};

export const getById = async (id: string) => {
    return await VeiculoModel.findById(id);
};

export const updateById = async (id: string, veiculo: Partial<IVeiculo>) => {
    return await VeiculoModel.findByIdAndUpdate(id, veiculo, { new: true });
};

export const deleteById = async (id: string) => {
    return await VeiculoModel.findByIdAndDelete(id);
};


//maltinha eu tive de criar várias funções de serviço para uma melhor organização. 
//uma vez que cada função te uma responsabilidade unica por assim dizer
// Ass:Pedro

