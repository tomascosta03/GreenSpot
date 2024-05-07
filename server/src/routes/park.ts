import express from "express";


const router = express.Router()
const Park = require('../models/parkModel')
const { 
    createPark,
    getParks,
    getPark,
    deletePark,
    updatePark 
} = require('../controllers/parkController')


// todos os utilizadores
router.get("/", getParks)

// ver um utilizador
router.get("/:id", getPark)

//adicionar um utilizador
router.post("/", createPark)

//remover um utilizador
router.delete('/:id', deletePark)

//atualizar um utilizador
router.patch('/:id', updatePark)


export default router;
