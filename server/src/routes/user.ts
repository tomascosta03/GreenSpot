import express from "express";


const router = express.Router()
const User = require('../models/userModel')
const { 
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser 
} = require('../controllers/userController')


// todos os utilizadores
router.get("/", getUsers)

// ver um utilizador
router.get("/:id", getUser)

//adicionar um utilizador
router.post("/", createUser)

//remover um utilizador
router.delete('/:id', deleteUser)

//atualizar um utilizador
router.patch('/:id', updateUser)


export default router;
