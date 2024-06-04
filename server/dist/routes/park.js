"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Park = require('../models/parkModel');
const { createPark, getParks, getPark, deletePark, updatePark } = require('../controllers/parkController');
// todos os utilizadores
router.get("/", getParks);
// ver um utilizador
router.get("/:id", getPark);
//adicionar um utilizador
router.post("/", createPark);
//remover um utilizador
router.delete('/:id', deletePark);
//atualizar um utilizador
router.patch('/:id', updatePark);
exports.default = router;
