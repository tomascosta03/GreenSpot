import express from 'express';
import { loginUser, registerUser, createUser, getUsers, getUser, deleteUser, updateUser } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Todas as rotas de utilizadores protegidas
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUser);
router.post("/", authMiddleware, createUser);
router.delete('/:id', authMiddleware, deleteUser);
router.patch('/:id', authMiddleware, updateUser);

// Registo de user e login não precisam de autenticação
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
