import { NextFunction, Request, Response } from 'express';
import { TodoListResponseDTO } from '../../types/TodoDTO';
import TodoService from '../../services/TodoService';
import { paginationSchema } from '../../schemas/querySchema';
import { ApiError } from '../../errors/ApiError';

export const getManyTodos = async (req: Request, res: Response, next: NextFunction) => {
    const parsedQuery = paginationSchema.safeParse(req.query);
    
    if (!parsedQuery.success) {
        return next(new ApiError(400, 'Invalid parameters', parsedQuery.error.format()));
    }

    const userId = req.userId!;
    const page = parsedQuery.data.page;
    const limit = parsedQuery.data.limit;
    const offset = (page - 1) * limit;

    try {
        const todoList = await TodoService.findPaginatedByUserId(userId, limit, offset);
        res.status(200).json(todoList);
    } catch (error) {
        next(error);
    }
};
