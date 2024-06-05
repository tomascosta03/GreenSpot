import { Request, Response } from 'express';

import User from '../models/userModel';
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body
  
    if (!name || !email || !password) {
      res.status(400).json({message: 'Por favor adiciona todos os campos'})
    }
  
    // Check if user exists
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400).json({message: 'Utilizador Existente'})
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      name,
      email,
      isAdmin: false,
      password: hashedPassword,
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({message: 'Dados do utilizador inválidos'})
    }
  })
  
  const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({message: 'Credenciais Inválidas'})
    }
  })
  

  const getMe = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  
  // Generate JWT
  const generateToken = (id: any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }




// todos os utilizadores
const getUsers = async (req: Request, res: Response) => {
    const Users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(Users)
}

// um utilizador em especifico
const getUser = async (req: Request, res: Response) => {
    const { id } = req.params  //da-nos o id dos parametros da route

    if (!mongoose.Types.ObjectId.isValid(id)) {
        // assim verifica se o id e valido e nao crasha a app
        return res.status(404).json({error: 'Utilizador não existe'})
    }
    const user = await User.findById(id)

    if (!user) {
        // tem de ter o return senao o resto do codigo e executado
        return res.status(404).json({error: 'Utilizador não existe'})
    }

    res.status(200).json(user)
}



// criar um utilizador
const createUser = async (req: Request, res: Response) => {
    const {name, email, contact, isAdmin} = req.body

    // adicionar o user a db
    try{
        const user = await User.create({name, email, contact, isAdmin})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error})

    }
    res.json({message: 'POST de um novo utilizador'})

}

//eliminar um utilizador
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params  //da-nos o id dos parametros da route

    if (!mongoose.Types.ObjectId.isValid(id)) {
        // assim verifica se o id e valido e nao crasha a app
        return res.status(404).json({error: 'Utilizador não existe'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        // tem de ter o return senao o resto do codigo e executado
        return res.status(400).json({error: 'Utilizador não existe'})
    }

    res.status(200).json(user)
}

// atualizar um utilizador
const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params  //da-nos o id dos parametros da route

    if (!mongoose.Types.ObjectId.isValid(id)) {
        // assim verifica se o id e valido e nao crasha a app
        return res.status(404).json({error: 'Utilizador não existe'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        // tem de ter o return senao o resto do codigo e executado
        return res.status(400).json({error: 'Utilizador não existe'})
    }

    res.status(200).json(user)
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    registerUser,
    loginUser,
    getMe,
}