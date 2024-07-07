import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET as string;

function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      throw new Error('Token não fornecido');
    }

    const decode = jwt.verify(token, SECRET);
    req.user = decode;
    next();
  } catch (err) {
    let response = {
      message: 'Falha na autenticação.'
    };

    return res.status(401).send(response);
  }
}

export { auth };