import express from "express";


const router = express.Router();
const User = require('../models/userModel')

const users = [
    {
        username: "vhsousa",
        email: "vhsousa@me.com"
    },
    {
        username: "joaquim",
        email: "asd@me.com"
    }
]

// todos os utilizadores
router.get("/", (_, res) => {

    res.json(users);
});

// ver um utilizador
router.get("/:id", (req, res) => {
    res.json(users.filter(u => u.email == req.params.id));
})

//adicionar um utilizador
router.post('/', async (req, res) => {
    const {name, email, contact, isAdmin} = req.body
    try{
        const user = await User.create({name, email, contact, isAdmin})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error})

    }
    res.json({mssg: 'POST a new User'})

});

//remover um utilizador
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a User'})

});

//atualizar um utilizador
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a User'})

});
export default router;
