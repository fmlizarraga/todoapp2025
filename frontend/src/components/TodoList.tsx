import { TodoItemType } from "../types/todo";
import { TodoItem } from "./TodoItem";
import '../styles/todo-list.css';

type TodoListProps = {
    todoItems: TodoItemType[];
};

export const TodoList = ({todoItems}: TodoListProps) => {
    return (
        <div className="todo-list">
            {todoItems.map((todoItem) => (
                <TodoItem key={todoItem.id} todoItem={todoItem} />
            ))}
        </div>
    );
};