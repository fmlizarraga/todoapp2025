import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is required" }),
});
