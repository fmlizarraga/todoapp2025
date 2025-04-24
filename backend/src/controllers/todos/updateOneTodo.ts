import { NextFunction, Request, Response } from 'express';
import { TodoResponseDTO, UpdateTodoDTO } from '../../types/TodoDTO';
import TodoService from '../../services/TodoService';
import { updateTodoSchema } from '../../schemas/todoSchema';
import { ApiError } from '../../errors/ApiError';

export const updateOneTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId!;
    const parsed = updateTodoSchema.safeParse(req.body);
    
    if (!parsed.success) {
        return next(new ApiError(400, 'Invalid parameters', parsed.error.format()));
    }

    const { label, checked }: UpdateTodoDTO = parsed.data;

    try {
        const updatedTodo: TodoResponseDTO = await TodoService.updateTodo(
            id,
            userId,
            { label, checked }
        );
        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
};