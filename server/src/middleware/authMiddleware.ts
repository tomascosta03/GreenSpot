import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel';

interface DecodedToken extends JwtPayload {
  id: string;
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({message: 'Não Autorizado'});
    }
  } else {
    res.status(401).json({message: 'Não autorizado, token inexistente'});
  }
};

export default protect;
