"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
// Gerar um token JWT
const generateAuthToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
    return token;
};
// Registrar um utilizador
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contact, isAdmin, password } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já está em uso' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            name,
            email,
            contact,
            isAdmin,
            password: hashedPassword,
        });
        const token = generateAuthToken(newUser);
        newUser.token = token; // Armazenar o token no usuário
        yield newUser.save();
        res.status(201).json({ message: 'Usuário criado com sucesso', token });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Erro no servidor', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido no servidor' });
        }
    }
});
exports.registerUser = registerUser;
// Login de um utilizador
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utilizador não encontrado' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password incorreta' });
        }
        const token = generateAuthToken(user);
        user.token = token; // Armazenar o token no usuário
        yield user.save();
        res.json({ token });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Erro no servidor', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido no servidor' });
        }
    }
});
exports.loginUser = loginUser;
// Obter todos os utilizadores
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Erro ao obter utilizadores', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao obter utilizadores' });
        }
    }
});
exports.getUsers = getUsers;
// Obter um utilizador específico
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Utilizador não encontrado' });
    }
    try {
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilizador não encontrado' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Erro ao obter utilizador', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao obter utilizador' });
        }
    }
});
exports.getUser = getUser;
// Criar um utilizador
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contact, isAdmin, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            name,
            email,
            contact,
            isAdmin,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: 'Erro ao criar utilizador', error: err.message });
        }
        else {
            res.status(400).json({ message: 'Erro desconhecido ao criar utilizador' });
        }
    }
});
exports.createUser = createUser;
// Atualizar um utilizador
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Utilizador não encontrado' });
    }
    try {
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilizador não encontrado' });
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: 'Erro ao atualizar utilizador', error: err.message });
        }
        else {
            res.status(400).json({ message: 'Erro desconhecido ao atualizar utilizador' });
        }
    }
});
exports.updateUser = updateUser;
// Excluir um utilizador
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Utilizador não encontrado' });
    }
    try {
        const deletedUser = yield userModel_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilizador não encontrado' });
        }
        res.status(200).json(deletedUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: 'Erro ao excluir utilizador', error: err.message });
        }
        else {
            res.status(400).json({ message: 'Erro desconhecido ao excluir utilizador' });
        }
    }
});
exports.deleteUser = deleteUser;
