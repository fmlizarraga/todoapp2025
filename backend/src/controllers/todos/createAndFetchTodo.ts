import { NextFunction, Request, Response } from 'express';
import { CreateTodoDTO, TodoListResponseDTO } from '../../types/TodoDTO';
import TodoService from '../../services/TodoService';
import { createTodoSchema } from '../../schemas/todoSchema';
import { fetchPaginationSchema } from '../../schemas/querySchema';
import { createOneTodo } from './createOneTodo';
import { ApiError } from '../../errors/ApiError';

export const createAndFetchTodo = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const parsedBody = createTodoSchema.safeParse(req.body);
    const parsedQuery = fetchPaginationSchema.safeParse(req.query);

    if (!parsedBody.success) {
        const error = new ApiError(400, 'Validation error', parsedBody.error.format());
        next(error);
        return;
    }
    
    if (!parsedQuery.success) {
        return next(new ApiError(400, 'Invalid parameters', parsedQuery.error.format()));
    }
    
    if (!parsedQuery.data.fetch) {
        return createOneTodo(req, res, next);
    }

    const { page, limit } = parsedQuery.data
    const offset = (page - 1) * limit;

    const { label }: CreateTodoDTO = parsedBody.data;

    try {
        const todoList: TodoListResponseDTO = await TodoService.addAndFetchTodo(
            { label },
            userId,
            limit,
            offset
        );
        res.status(200).json(todoList);
    } catch (error) {
        next(error);
    }
};