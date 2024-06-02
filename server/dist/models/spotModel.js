"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const spotSchema = new Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    occupied: {
        type: Boolean,
        required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose_1.default.model('Spot', spotSchema);
