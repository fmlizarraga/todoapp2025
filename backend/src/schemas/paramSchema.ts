import { z } from 'zod';

export const idParamSchema = z.object({
    id: z.string().uuid('ID must be a valid UUID'),
});
