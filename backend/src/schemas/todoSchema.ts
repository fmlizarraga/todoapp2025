import { z } from 'zod';

export const createTodoSchema = z.object({
    label: z.string().min(1, 'El label no puede estar vacío'),
});

export const updateTodoSchema = z.object({
    label: z.string().min(1, 'El label no puede estar vacío').optional(),
    checked: z.boolean().optional(),
});
