import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';
import { verifyToken } from '../utils/jwt';

interface JwtPayload {
  userId: string;
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new ApiError(401, 'Not authenticated');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new ApiError(401, 'Token not provided');
  }

  try {
    const decodedToken = verifyToken(token) as JwtPayload;
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    next(new ApiError(401, 'Invalid token'));
  }
};
