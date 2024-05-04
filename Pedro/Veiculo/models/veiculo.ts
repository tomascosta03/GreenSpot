import { Document, Schema, model } from "mongoose";

export interface IVeiculo extends Document {
    idVeiculo: number,
    matricula: string,
    cor: string,
    modelo: string
}

const VeiculoSchema = new Schema({
    idVeiculo: Number,
    matricula: String,
    cor: String,
    modelo: String
});

export const VeiculoModel = model<IVeiculo>(
    "veiculos",
    VeiculoSchema
);
