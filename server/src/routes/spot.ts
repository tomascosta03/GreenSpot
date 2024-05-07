import express from "express";


const router = express.Router()
const Spot = require('../models/spotModel')
const { 
    createSpot,
    getSpots,
    getSpot,
    deleteSpot,
    updateSpot 
} = require('../controllers/spotController')


// todos os utilizadores
router.get("/", getSpots)

// ver um utilizador
router.get("/:id", getSpot)

//adicionar um utilizador
router.post("/", createSpot)

//remover um utilizador
router.delete('/:id', deleteSpot)

//atualizar um utilizador
router.patch('/:id', updateSpot)


export default router;
