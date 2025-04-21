import { NextFunction, Request, Response } from 'express';
import { TodoResponseDTO, UpdateTodoDTO } from '../../types/TodoDTO';
import TodoService from '../../services/TodoService';
import { updateTodoSchema } from '../../schemas/todoSchema';
import { ApiError } from '../../errors/ApiError';

export const updateOneTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const parsed = updateTodoSchema.safeParse(req.body);
    
    if (!parsed.success) {
        const error = new ApiError(400, 'Validation error', parsed.error.format());
        next(error);
        return;
    }

    const { label, checked }: UpdateTodoDTO = parsed.data;

    try {
        const updatedTodo: TodoResponseDTO = await TodoService.updateTodo(Number(id), { label, checked });
        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
};