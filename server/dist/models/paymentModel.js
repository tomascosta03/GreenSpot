"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const paymentSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose_1.default.model('Payment', paymentSchema);
