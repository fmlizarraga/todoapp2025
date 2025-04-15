import { useState } from 'react';
import { TodoItemType } from '../types/todo';

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  const addTodo = (label: string) => {
    if (label.trim() === '') return;
    const newTodo: TodoItemType = {
      id: Date.now(),
      label,
      checked: false,
      timestamp: Date.now()
    };
    setTodoList([...todoList, newTodo]);
  };

  const toggleCheck = (id: number) => {
    setTodoList(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const editTodo = (id: number, newLabel: string) => {
    setTodoList(prev =>
      prev.map(item => item.id === id ? { ...item, label: newLabel } : item)
    );
  };

  const deleteTodo = (id: number) => {
    setTodoList(prev => prev.filter(item => item.id !== id));
  };

  const resetList = () => setTodoList([]);

  return {
    todoList,
    addTodo,
    toggleCheck,
    editTodo,
    deleteTodo,
    resetList,
  };
};
