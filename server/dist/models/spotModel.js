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
    reserved: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
const Spot = mongoose_1.default.model('Spot', spotSchema);
exports.default = Spot;
