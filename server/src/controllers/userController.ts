import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/userModel';

// Gerar um token JWT
const generateAuthToken = (user: any) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
  return token;
};

// Registar um utilizador
const registerUser = async (req: Request, res: Response) => {
  const { name, email, contact, isAdmin, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      contact,
      isAdmin,
      password: hashedPassword,
    });

    const token = generateAuthToken(newUser);
    newUser.token = token;  // Armazenar o token no utilizador
    await newUser.save();

    res.status(201).json({ message: 'Utilizador criado com sucesso', token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro no servidor', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido no servidor' });
    }
  }
};

// Login de um utilizador
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilizador não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password incorreta' });
    }

    const token = generateAuthToken(user);
    user.token = token;  // Armazenar o token no utilizador
    await user.save();

    res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro no servidor', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido no servidor' });
    }
  }
};

// Obter todos os utilizadores
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao obter utilizadores', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao obter utilizadores' });
    }
  }
};

// Obter um utilizador específico
const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Utilizador não encontrado' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado' });
    }

    res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao obter utilizador', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao obter utilizador' });
    }
  }
};

// Criar um utilizador
const createUser = async (req: Request, res: Response) => {
  const { name, email, contact, isAdmin, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      contact,
      isAdmin,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: 'Erro ao criar utilizador', error: err.message });
    } else {
      res.status(400).json({ message: 'Erro desconhecido ao criar utilizador' });
    }
  }
};

// Atualizar um utilizador
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Utilizador não encontrado' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilizador não encontrado' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: 'Erro ao atualizar utilizador', error: err.message });
    } else {
      res.status(400).json({ message: 'Erro desconhecido ao atualizar utilizador' });
    }
  }
};

// Excluir um utilizador
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Utilizador não encontrado' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilizador não encontrado' });
    }

    res.status(200).json(deletedUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: 'Erro ao excluir utilizador', error: err.message });
    } else {
      res.status(400).json({ message: 'Erro desconhecido ao excluir utilizador' });
    }
  }
};

export { registerUser, loginUser, getUsers, getUser, createUser, updateUser, deleteUser };
