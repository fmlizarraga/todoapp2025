import { NextFunction, Request, Response } from 'express';
import { CreateTodoDTO, TodoResponseDTO } from '../../types/TodoDTO';
import TodoService from '../../services/TodoService';
import { createTodoSchema } from '../../schemas/todoSchema';
import { ApiError } from '../../errors/ApiError';

export const createOneTodo = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const parsed = createTodoSchema.safeParse(req.body);

    if (!parsed.success) {
        const error = new ApiError(400, 'Validation error', parsed.error.format());
        next(error);
        return;
    }

    const { label }: CreateTodoDTO = parsed.data;

    try {
        const newTodo:TodoResponseDTO = await TodoService.addTodo({ label }, userId);
        res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
};