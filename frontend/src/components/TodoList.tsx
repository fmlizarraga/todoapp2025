import { TodoItemType } from "../types/todo";
import { TodoItem } from "./TodoItem";
import '../styles/todo-list.css';

type TodoListProps = {
    todoItems: TodoItemType[];
    onToggleCheck: (id: number) => void;
    onEdit: (id: number, newLabel: string) => void;
    onDelete: (id: number) => void
};

export const TodoList = ({todoItems, onToggleCheck, onEdit, onDelete}: TodoListProps) => {
    
    if (todoItems.length === 0) {
        return <div className="todo-list"><p>No hay tareas pendientes</p></div>;
    }
    
    return (
        <div className="todo-list">
            {todoItems.map((todoItem) => (
                <TodoItem
                    key={todoItem.id}
                    todoItem={todoItem}
                    onToggleCheck={onToggleCheck}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};