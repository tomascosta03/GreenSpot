"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reserveSpot = void 0;
const spotModel_1 = __importDefault(require("../models/spotModel"));
const reservationModel_1 = __importDefault(require("../models/reservationModel"));
const mongoose = require('mongoose');
// todos os spots
const getSpots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Spots = yield spotModel_1.default.find({}).sort({ createdAt: -1 });
    res.status(200).json(Spots);
});
// um spot específico
const getSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Lugar não existe' });
    }
    const spot = yield spotModel_1.default.findById(id);
    if (!spot) {
        return res.status(404).json({ error: 'Lugar não existe' });
    }
    res.status(200).json(spot);
});
// criar um spot
const createSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { longitude, latitude, size, reserved } = req.body;
    try {
        const spot = yield spotModel_1.default.create({
            longitude, latitude, size, reserved
        });
        res.status(200).json(spot);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
// eliminar um Lugar
const deleteSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Lugar não existe' });
    }
    const spot = yield spotModel_1.default.findOneAndDelete({ _id: id });
    if (!spot) {
        return res.status(400).json({ error: 'Lugar não existe' });
    }
    res.status(200).json(spot);
});
// atualizar um Lugar
const updateSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Lugar não existe' });
    }
    const spot = yield spotModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!spot) {
        return res.status(400).json({ error: 'Lugar não existe' });
    }
    res.status(200).json(spot);
});
const reserveSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { spotId } = req.params;
    const { userId, startTime, duration } = req.body;
    try {
        const spot = yield spotModel_1.default.findById(spotId);
        if (!spot) {
            return res.status(404).json({ message: 'Lugar não encontrado' });
        }
        if (spot.reserved) {
            return res.status(400).json({ message: 'Lugar já está reservado' });
        }
        spot.reserved = true;
        yield spot.save();
        const startTimeDate = new Date(startTime);
        const endTimeDate = new Date(startTimeDate.getTime() + duration * 60000);
        const reservation = new reservationModel_1.default({
            spot: spotId,
            user: userId,
            startTime: startTimeDate,
            endTime: endTimeDate
        });
        yield reservation.save();
        res.status(200).json({ message: 'Lugar reservado com sucesso!', reservation });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro do servidor', error });
    }
});
exports.reserveSpot = reserveSpot;
module.exports = {
    createSpot,
    getSpots,
    getSpot,
    deleteSpot,
    updateSpot,
    reserveSpot: exports.reserveSpot
};
