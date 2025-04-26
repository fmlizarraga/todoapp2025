import { TodoItemType } from "../types/todo";
import { TodoItem } from "./TodoItem";
import '../styles/todo-list.css';

type TodoListProps = {
    todoItems: TodoItemType[];
    onToggleCheck: (id: string) => void;
    onEdit: (id: string, newLabel: string) => void;
    onDelete: (id: string) => void;
    page: number;
    limit: number;
    total: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
};

export const TodoList = ({
    todoItems,
    onToggleCheck,
    onEdit,
    onDelete,
    page,
    limit,
    total,
    onNextPage,
    onPreviousPage
}: TodoListProps) => {
    
    if (todoItems.length === 0) {
        return <div className="todo-list"><p>No hay tareas pendientes</p></div>;
    }
    
    return (
        <div className="todo-list-container">
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
            <div className="pagination">
                <button disabled={page <= 1} onClick={onPreviousPage}>Anterior</button>
                <span>Página {page}</span>
                <button disabled={page * limit >= total} onClick={onNextPage}>Siguiente</button>
            </div>
        </div>
    );
};