"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotController_1 = require("../controllers/spotController");
const router = express_1.default.Router();
const Spot = require('../models/spotModel');
const { createSpot, getSpots, getSpot, deleteSpot, updateSpot } = require('../controllers/spotController');
// todos os lugares
router.get("/", getSpots);
// ver um lugar
router.get("/:id", getSpot);
//adicionar um lugar
router.post("/", createSpot);
//remover um lugar
router.delete('/:id', deleteSpot);
//atualizar um lugar
router.patch('/:id', updateSpot);
// Reservar um spot em especifico
router.post('/reserve/:spotId', spotController_1.reserveSpot);
exports.default = router;
