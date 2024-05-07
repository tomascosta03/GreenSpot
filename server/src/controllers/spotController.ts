import { Request, Response } from 'express';
const Spot = require('../models/spotModel');
const mongoose = require('mongoose');

// todos os spots
const getSpots = async (req: Request, res: Response) => {
    const Spots = await Spot.find({}).sort({createdAt: -1});
    res.status(200).json(Spots);
}

// um spot específico
const getSpot = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Lugar não existe'});
    }

    const spot = await Spot.findById(id);

    if (!spot) {
        return res.status(404).json({error: 'Lugar não existe'});
    }

    res.status(200).json(spot);
}

// criar um spot
const createSpot = async (req: Request, res: Response) => {
    const { location, size, occupied, isPrivate } = req.body;

    try {
        const spot = await Spot.create({ location, size, occupied, isPrivate });
        res.status(200).json(spot);
    } catch (error) {
        res.status(400).json({ error });
    }
}

// eliminar um Lugar
const deleteSpot = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Lugar não existe'});
    }

    const spot = await Spot.findOneAndDelete({ _id: id });

    if (!spot) {
        return res.status(400).json({ error: 'Lugar não existe' });
    }

    res.status(200).json(spot);
}

// atualizar um Lugar
const updateSpot = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Lugar não existe'});
    }

    const spot = await Spot.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!spot) {
        return res.status(400).json({error: 'Lugar não existe'});
    }

    res.status(200).json(spot);
}

module.exports = {
    createSpot,
    getSpots,
    getSpot,
    deleteSpot,
    updateSpot
}
