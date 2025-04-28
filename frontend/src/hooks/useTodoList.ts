import { useState } from 'react';
import {
    enrichedAddTodo as APIaddTodo,
    updateTodo as APIupdateTodo,
    deleteTodo as APIdeleteTodo,
    getManyTodos as APIgetTodos
} from '../api/todos';
import { useAuth } from './'
import { TodoItemType } from '../types/todo';

export const useTodoList = () => {
    const [todoList, setTodoList] = useState<TodoItemType[]>([]);
    const { setError } = useAuth();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const addTodo = async (label: string) => {
        if (label.trim() === '') return;
        try {
            const data = await APIaddTodo({ label });
            setTodoList(data.todos);
            setTotal(data.total ?? 0);
            setError(null);
        } catch (err) {
            setError("Error adding todo");
            console.error(err);
        }
    };

    const updateTodo = async (id: string, updatedData: { label?: string; checked?: boolean }) => {
        try {
            const updatedTodo = await APIupdateTodo(id, updatedData);
            setTodoList(prev => prev.map(item => item.id === id ? updatedTodo : item));
            setError(null);
        } catch (err) {
            setError("Error updating todo");
            console.error(err);
        }
    };

    const editTodo = (id: string, newLabel: string) => {
        updateTodo(id, { label: newLabel });
    };

    const toggleCheck = (id: string) => {
        updateTodo(id, { checked: !todoList.find(item => item.id === id)?.checked });
    };

    const deleteTodo = async (id: string) => {
        try {
            await APIdeleteTodo(id);
            setTodoList(prev => prev.filter(item => item.id !== id));
            setError(null);
        } catch (err) {
            setError("Error deleting todo");
            console.error(err);
        }
    };

    const resetList = () => setTodoList([]);

    const getTodos = async () => {
        try {
            const data = await APIgetTodos(page, limit);
            setTodoList(data.todos);
            setTotal(data.total ?? 0);
    
            if (data.page !== undefined) setPage(data.page);
            if (data.limit !== undefined) setLimit(data.limit);
        } catch (err) {
            setError("Error getting todos");
            console.error(err);
        }
    };

    return {
        todoList,
        addTodo,
        toggleCheck,
        editTodo,
        deleteTodo,
        resetList,
        page,
        setPage,        
        limit,
        setLimit,
        total,
        setTotal,
        setTodoList,
        getTodos
    };
};
