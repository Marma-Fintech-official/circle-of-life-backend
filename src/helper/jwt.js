import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error("Missing JWT_SECRET_KEY in environment variables.");
}

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET_KEY);
}
