"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const notificationSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    typeOfNotification: {
        type: String,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose_1.default.model('Notification', notificationSchema);
