import { Document, Schema, model } from "mongoose";

// Define a Mongoose model
export interface ISpot extends Document {
    idSpot: number,
    location: string,
    size: string,
    ocupied: boolean
}

const SpotSchema = new Schema({
    idSpot: Number,
    location: String,
    size: String,
    ocupied: Boolean
});

export const SpotModel = model<ISpot>(
    "spots",
    SpotSchema
);