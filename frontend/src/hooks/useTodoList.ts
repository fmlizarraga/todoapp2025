import { useState } from 'react';
import { addTodo as APIaddTodo, updateTodo as APIupdateTodo, deleteTodo as APIdeleteTodo, getManyTodos } from '../api/todos';
import { useAuth } from './'
import { TodoItemType } from '../types/todo';

export const useTodoList = () => {
    const [todoList, setTodoList] = useState<TodoItemType[]>([]);
    const { setError } = useAuth();

    const addTodo = async (label: string) => {
            if (label.trim() === '') return;
        try {
            const newTodo: TodoItemType = await APIaddTodo({ label });
            setTodoList([...todoList, newTodo]);
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

    const getTodoList = async () => {
        try {
            const todos = await getManyTodos();
            setTodoList(todos.todos);
            setError(null);
        } catch (err) {
            setError("Error getting todo list");
            console.error(err);
        }
    };

    const resetList = () => setTodoList([]);

    return {
        todoList,
        addTodo,
        toggleCheck,
        editTodo,
        deleteTodo,
        resetList,
        getTodoList
    };
};
