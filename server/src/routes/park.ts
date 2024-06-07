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



router.get("/", getParks)


router.get("/:id", getPark)

router.post("/", createPark)


router.delete('/:id', deletePark)


router.patch('/:id', updatePark)


export default router;
