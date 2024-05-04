import { Document, Schema, model } from "mongoose";

// Define a Mongoose model
export interface ILugar extends Document {
    idLugar: number,
    localizacao: string,
    tamanho: string,
    ocupado: boolean
}

const LugarSchema = new Schema({
    idLugar: Number,
    localizacao: String,
    tamanho: String,
    ocupado: Boolean
});

export const LugarModel = model<ILugar>(
    "lugares",
    LugarSchema
);