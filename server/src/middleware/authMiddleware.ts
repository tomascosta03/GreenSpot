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
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
    
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({message: 'Not authorized'});
    }
  } else {
    res.status(401).json({message: 'Not authorized, no token'});
  }
};

export default protect;
