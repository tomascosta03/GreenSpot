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
Object.defineProperty(exports, "__esModule", { value: true });
const Spot = require('../models/spotModel');
const mongoose = require('mongoose');
// todos os spots
const getSpots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Spots = yield Spot.find({}).sort({ createdAt: -1 });
    res.status(200).json(Spots);
});
// um spot específico
const getSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Lugar não existe' });
    }
    const spot = yield Spot.findById(id);
    if (!spot) {
        return res.status(404).json({ error: 'Lugar não existe' });
    }
    res.status(200).json(spot);
});
// criar um spot
const createSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { longitude, latitude, size, occupied, isPrivate } = req.body;
    try {
        const spot = yield Spot.create({ longitude, latitude, size, occupied, isPrivate });
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
    const spot = yield Spot.findOneAndDelete({ _id: id });
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
    const spot = yield Spot.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!spot) {
        return res.status(400).json({ error: 'Lugar não existe' });
    }
    res.status(200).json(spot);
});
module.exports = {
    createSpot,
    getSpots,
    getSpot,
    deleteSpot,
    updateSpot
};
