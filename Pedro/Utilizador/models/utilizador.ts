import { Document, Schema, model } from "mongoose";

export interface IUtilizador extends Document {
    idUtilizador: number,
    nome: string,
    email: string,
    contacto: string,
    tipoUtilizador: string
}

const UtilizadorSchema = new Schema({
    idUtilizador: Number,
    nome: String,
    email: String,
    contacto: String,
    tipoUtilizador: String
});

export const UtilizadorModel = model<IUtilizador>(
    "utilizadores",
    UtilizadorSchema
);
