"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const parkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    emptySpaces: {
        type: Number,
        required: true
    },
    occupiedSpaces: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose_1.default.model('Park', parkSchema);
