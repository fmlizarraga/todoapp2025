import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export function generateToken(userId: number, expiresIn: number = 3600): string {
  return jwt.sign({ userId }, JWT_SECRET!, { expiresIn });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET!);
}
