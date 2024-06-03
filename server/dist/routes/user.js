"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
// Todas as rotas de utilizadores protegidas
router.get("/", authMiddleware_1.default, userController_1.getUsers);
router.get("/:id", authMiddleware_1.default, userController_1.getUser);
router.post("/", authMiddleware_1.default, userController_1.createUser);
router.delete('/:id', authMiddleware_1.default, userController_1.deleteUser);
router.patch('/:id', authMiddleware_1.default, userController_1.updateUser);
// Registro de user e login não precisam de autenticação
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
exports.default = router;
