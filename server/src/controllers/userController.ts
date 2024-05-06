import { Request, Response } from 'express';

const User = require('../models/userModel')
const mongoose = require('mongoose')

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
        return res.status(404).json({error: 'Utilizador nao existe'})
    }
    const user = await User.findById(id)

    if (!user) {
        // tem de ter o return senao o resto do codigo e executado
        return res.status(404).json({error: 'Utilizador nao existe'})
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
    res.json({mssg: 'POST a new User'})

}

//eliminar um utilizador
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params  //da-nos o id dos parametros da route

    if (!mongoose.Types.ObjectId.isValid(id)) {
        // assim verifica se o id e valido e nao crasha a app
        return res.status(404).json({error: 'Utilizador nao existe'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        // tem de ter o return senao o resto do codigo e executado
        return res.status(400).json({error: 'Utilizador nao existe'})
    }

    res.status(200).json(user)
}

// atualizar um utilizador
const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params  //da-nos o id dos parametros da route

    if (!mongoose.Types.ObjectId.isValid(id)) {
        // assim verifica se o id e valido e nao crasha a app
        return res.status(404).json({error: 'Utilizador nao existe'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        // tem de ter o return senao o resto do codigo e executado
        return res.status(400).json({error: 'Utilizador nao existe'})
    }

    res.status(200).json(user)
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}