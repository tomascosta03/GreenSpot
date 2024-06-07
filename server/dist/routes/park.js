"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Park = require('../models/parkModel');
const { createPark, getParks, getPark, deletePark, updatePark } = require('../controllers/parkController');
router.get("/", getParks);
router.get("/:id", getPark);
router.post("/", createPark);
router.delete('/:id', deletePark);
router.patch('/:id', updatePark);
exports.default = router;
