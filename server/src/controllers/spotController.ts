import { Request, Response } from 'express';
import Spot from '../models/spotModel';
import Reservation from '../models/reservationModel';
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
    const { longitude, latitude, size, reserved } = req.body;

    try {
        const spot = await Spot.create({ 
            longitude, latitude, size, reserved });
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

export const reserveSpot = async (req: Request, res: Response) => {
    const { spotId } = req.params;
    const { userId, startTime, duration } = req.body;
  
    try {
      const spot = await Spot.findById(spotId);
      if (!spot) {
        return res.status(404).json({ message: 'Lugar não encontrado' });
      }
  
      if (spot.reserved) {
        return res.status(400).json({ message: 'Lugar já está reservado' });
      }
  
      spot.reserved = true;
      await spot.save();
  
      const startTimeDate = new Date(startTime);
      const endTimeDate = new Date(startTimeDate.getTime() + duration * 60000);
  
      const reservation = new Reservation({
        spot: spotId,
        user: userId,
        startTime: startTimeDate,
        endTime: endTimeDate
      });
      await reservation.save();
  
      res.status(200).json({ message: 'Lugar reservado com sucesso!', reservation });
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor', error });
    }
  };

module.exports = {
    createSpot,
    getSpots,
    getSpot,
    deleteSpot,
    updateSpot,
    reserveSpot
}
