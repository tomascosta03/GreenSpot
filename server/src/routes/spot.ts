import express from "express";
import { reserveSpot } from '../controllers/spotController';

const router = express.Router()
const Spot = require('../models/spotModel')
const { 
    createSpot,
    getSpots,
    getSpot,
    deleteSpot,
    updateSpot 
} = require('../controllers/spotController')


// todos os lugares
router.get("/", getSpots)

// ver um lugar
router.get("/:id", getSpot)

//adicionar um lugar
router.post("/", createSpot)

//remover um lugar
router.delete('/:id', deleteSpot)

//atualizar um lugar
router.patch('/:id', updateSpot)

// Reservar um spot em especifico
router.post('/reserve/:spotId', reserveSpot);


export default router;
