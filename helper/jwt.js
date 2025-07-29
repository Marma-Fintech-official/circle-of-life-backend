import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
}

export async function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET_KEY);
}
