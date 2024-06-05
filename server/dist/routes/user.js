"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { createUser, getUsers, getUser, deleteUser, updateUser, getMe, registerUser, loginUser } = require('../controllers/userController');
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.get('/me', authMiddleware_1.default, getMe);
// todos os utilizadores
router.get("/", authMiddleware_1.default, getUsers);
// ver um utilizador
router.get("/:id", authMiddleware_1.default, getUser);
//adicionar um utilizador
router.post("/", authMiddleware_1.default, createUser);
//remover um utilizador
router.delete('/:id', authMiddleware_1.default, deleteUser);
//atualizar um utilizador
router.patch('/:id', authMiddleware_1.default, updateUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
exports.default = router;
