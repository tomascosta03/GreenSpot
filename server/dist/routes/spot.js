"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Spot = require('../models/spotModel');
const { createSpot, getSpots, getSpot, deleteSpot, updateSpot } = require('../controllers/spotController');
// todos os utilizadores
router.get("/", getSpots);
// ver um utilizador
router.get("/:id", getSpot);
//adicionar um utilizador
router.post("/", createSpot);
//remover um utilizador
router.delete('/:id', deleteSpot);
//atualizar um utilizador
router.patch('/:id', updateSpot);
exports.default = router;
