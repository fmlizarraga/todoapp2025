import { NextFunction, Request, Response } from 'express';
import TodoService from '../../services/TodoService';
import { idParamSchema } from '../../schemas/paramSchema';
import { ApiError } from '../../errors/ApiError';

export const deleteOneTodo = (req: Request, res: Response, next: NextFunction) => {
    const parsed = idParamSchema.safeParse(req.params);

    if (!parsed.success) {
        return next(new ApiError(400, 'Invalid parameters', parsed.error.format()));
    }

    try {
        TodoService.deleteTodo(Number(parsed.data.id));
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};