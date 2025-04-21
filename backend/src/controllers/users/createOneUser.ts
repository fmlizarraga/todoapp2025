import { Request, Response, NextFunction } from 'express';
import { RegisterDTO, LoginResponseDTO } from '../../types/UserDTO';
import UserService from '../../services/UserService';
import { generateToken } from '../../utils/jwt';
import { registerSchema } from '../../schemas/userSchema';
import { ApiError } from '../../errors/ApiError';

export const createOneUser = async (req: Request, res: Response, next: NextFunction) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
        const error = new ApiError(400, 'Validation error', parsed.error.format());
        next(error);
        return;
    }

    const { email, username, password }: RegisterDTO = parsed.data;

    try {
        const newUserRes = await UserService.registerUser({ email, username, password });
        const token = generateToken(newUserRes.id);
        const loginResponse: LoginResponseDTO = { user: newUserRes, token };
        res.status(201).json(loginResponse);
    } catch (error) {
        next(error);
    }
};