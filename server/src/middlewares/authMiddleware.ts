import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const user = await User.findOne({ _id: (decoded as any).userId, token });

    if (!user) {
      throw new Error();
    }

    (req as any).user = user;  // Armazenar as informações do utulizador na requisição
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;
