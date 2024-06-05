import express from "express";
import { get } from "mongoose";
import User from '../models/userModel';

const router = express.Router()

const { 
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    getMe,
    registerUser,
    loginUser 
} = require('../controllers/userController')

import protect from "../middleware/authMiddleware";
router.get('/me', getMe)

// todos os utilizadores
router.get("/", protect, getUsers)

// ver um utilizador
router.get("/:id", protect,getUser)

//adicionar um utilizador
router.post("/", protect, createUser)

//remover um utilizador
router.delete('/:id', protect, deleteUser)

//atualizar um utilizador
router.patch('/:id', protect, updateUser)


router.post('/register', registerUser);
router.post('/login', loginUser);



export default router;
