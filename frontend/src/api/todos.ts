import { CreateTodoDTO, TodoItemResponseDTO, TodoListResponseDTO, UpdateTodoDTO } from "../types/api";
import api from "./api";

export const getManyTodos = async (page: number = 1, limit: number = 10): Promise<TodoListResponseDTO> => {
    const { data } = await api.get(`/todos?page=${page}&limit=${limit}`);
    return data;
};

export const addTodo = async ({label}: CreateTodoDTO): Promise<TodoItemResponseDTO> => {
    const { data } = await api.post("/todos", { label });
    return data;
};

export const updateTodo = async (id: string, {label, checked}: UpdateTodoDTO): Promise<TodoItemResponseDTO> => {
    const { data } = await api.put(`/todos/${id}`, { label, checked });
    return data;
};

export const getOneTodo = async (id: string): Promise<TodoItemResponseDTO> => {
    const { data } = await api.get(`/todos/${id}`);
    return data;
};

export const deleteTodo = async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
    return;
};
