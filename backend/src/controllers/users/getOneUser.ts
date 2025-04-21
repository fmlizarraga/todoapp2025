import { NextFunction, Request, Response } from 'express';
import { UserResponseDTO, LoginResponseDTO, LoginDTO } from '../../types/UserDTO';
import UserService from '../../services/UserService';
import { generateToken } from '../../utils/jwt';
import { loginSchema } from '../../schemas/userSchema';
import { ApiError } from '../../errors/ApiError';

export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        const error = new ApiError(400, 'Validation error', parsed.error.format());
        next(error);
        return;
    }
    
    const { email, password }: LoginDTO = parsed.data;

    try {
        const recoveredUser: UserResponseDTO = await UserService.loginUser({ email, password });
        const token = generateToken(recoveredUser.id);
        const loginResponse: LoginResponseDTO = { user: recoveredUser, token };
        res.status(201).json(loginResponse);
    } catch (error) {
        next(error);
    }
};