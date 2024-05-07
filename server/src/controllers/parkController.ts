import { Request, Response } from 'express';
const Park = require('../models/parkModel');
const mongoose = require('mongoose');

// todos os parques
const getParks = async (req: Request, res: Response) => {
    const Parks = await Park.find({}).sort({createdAt: -1});
    res.status(200).json(Parks);
}

// um parque em específico
const getPark = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Parque não existe'});
    }

    const park = await Park.findById(id);

    if (!park) {
        return res.status(404).json({error: 'Parque não existe'});
    }

    res.status(200).json(park);
}

// criar um parque
const createPark = async (req: Request, res: Response) => {
    const { name, location, emptySpaces, occupiedSpaces, isPaid } = req.body;

    try {
        const park = await Park.create({ name, location, emptySpaces, occupiedSpaces, isPaid });
        res.status(200).json(park);
    } catch (error) {
        res.status(400).json({ error });
    }
}

// eliminar um parque
const deletePark = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Parque não existe'});
    }

    const park = await Park.findOneAndDelete({ _id: id });

    if (!park) {
        return res.status(400).json({ error: 'Parque não existe' });
    }

    res.status(200).json(park);
}

// atualizar um parque
const updatePark = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Parque não existe'});
    }

    const park = await Park.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!park) {
        return res.status(400).json({error: 'Parque não existe'});
    }

    res.status(200).json(park);
}

module.exports = {
    createPark,
    getParks,
    getPark,
    deletePark,
    updatePark
}
