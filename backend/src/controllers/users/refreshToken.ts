import { NextFunction, Request, Response } from 'express';
import { LoginResponseDTO } from '../../types/UserDTO';
import UserService from '../../services/UserService';
import { generateToken } from '../../utils/jwt';

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    try {
        const user = await UserService.getUserData(userId);
        const token = generateToken(userId);
        const loginResponse: LoginResponseDTO = { user, token };
        res.status(200).json(loginResponse);
    } catch (error) {
        next(error);
    }
};
