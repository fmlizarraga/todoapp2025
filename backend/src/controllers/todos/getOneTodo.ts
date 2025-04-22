import { NextFunction, Request, Response } from 'express';
import { TodoResponseDTO } from '../../types/TodoDTO';
import TodoService from '../../services/TodoService';
import { idParamSchema } from '../../schemas/paramSchema';
import { ApiError } from '../../errors/ApiError';

export const getOneTodo = async (req: Request, res: Response, next: NextFunction) => {
    const parsed = idParamSchema.safeParse(req.params);
    const userId = req.userId!;

    if (!parsed.success) {
        return next(new ApiError(400, 'Invalid parameters', parsed.error.format()));
    }

    try {
        const todo: TodoResponseDTO = await TodoService.getOneTodo(
            Number(parsed.data.id), userId
        );
        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};