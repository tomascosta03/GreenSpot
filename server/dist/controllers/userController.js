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
const userModel_1 = __importDefault(require("../models/userModel"));
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const registerUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Por favor adiciona todos os campos' });
    }
    // Check if user exists
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: 'Utilizador Existente' });
    }
    // Hash password
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(password, salt);
    // Create user
    const user = yield userModel_1.default.create({
        name,
        email,
        isAdmin: false,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400).json({ message: 'Dados do utilizador inválidos' });
    }
}));
const loginUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check for user email
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400).json({ message: 'Credenciais Inválidas' });
    }
}));
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.user._id).select('-password');
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
// todos os utilizadores
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Users = yield userModel_1.default.find({}).sort({ createdAt: -1 });
    res.status(200).json(Users);
});
// um utilizador em especifico
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //da-nos o id dos parametros da route
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // assim verifica se o id e valido e nao crasha a app
        return res.status(404).json({ error: 'Utilizador não existe' });
    }
    const user = yield userModel_1.default.findById(id);
    if (!user) {
        // tem de ter o return senao o resto do codigo e executado
        return res.status(404).json({ error: 'Utilizador não existe' });
    }
    res.status(200).json(user);
});
// criar um utilizador
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contact, isAdmin } = req.body;
    // adicionar o user a db
    try {
        const user = yield userModel_1.default.create({ name, email, contact, isAdmin });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error });
    }
    res.json({ message: 'POST de um novo utilizador' });
});
//eliminar um utilizador
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //da-nos o id dos parametros da route
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // assim verifica se o id e valido e nao crasha a app
        return res.status(404).json({ error: 'Utilizador não existe' });
    }
    const user = yield userModel_1.default.findOneAndDelete({ _id: id });
    if (!user) {
        // tem de ter o return senao o resto do codigo e executado
        return res.status(400).json({ error: 'Utilizador não existe' });
    }
    res.status(200).json(user);
});
// atualizar um utilizador
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //da-nos o id dos parametros da route
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // assim verifica se o id e valido e nao crasha a app
        return res.status(404).json({ error: 'Utilizador não existe' });
    }
    const user = yield userModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!user) {
        // tem de ter o return senao o resto do codigo e executado
        return res.status(400).json({ error: 'Utilizador não existe' });
    }
    res.status(200).json(user);
});
module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    registerUser,
    loginUser,
    getMe,
};
