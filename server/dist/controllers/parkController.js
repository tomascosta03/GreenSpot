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
const Park = require('../models/parkModel');
const mongoose = require('mongoose');
// todos os parques
const getParks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Parks = yield Park.find({}).sort({ createdAt: -1 });
    res.status(200).json(Parks);
});
// um parque em específico
const getPark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Parque não existe' });
    }
    const park = yield Park.findById(id);
    if (!park) {
        return res.status(404).json({ error: 'Parque não existe' });
    }
    res.status(200).json(park);
});
// criar um parque
const createPark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, longitude, latitude, emptySpaces, occupiedSpaces, isPaid } = req.body;
    try {
        const park = yield Park.create({ name, longitude, latitude, emptySpaces, occupiedSpaces, isPaid });
        res.status(200).json(park);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
// eliminar um parque
const deletePark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Parque não existe' });
    }
    const park = yield Park.findOneAndDelete({ _id: id });
    if (!park) {
        return res.status(400).json({ error: 'Parque não existe' });
    }
    res.status(200).json(park);
});
// atualizar um parque
const updatePark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Parque não existe' });
    }
    const park = yield Park.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!park) {
        return res.status(400).json({ error: 'Parque não existe' });
    }
    res.status(200).json(park);
});
module.exports = {
    createPark,
    getParks,
    getPark,
    deletePark,
    updatePark
};
