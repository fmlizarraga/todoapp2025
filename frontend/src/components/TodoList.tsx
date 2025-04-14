import { TodoItem } from "./TodoItem";
import '../styles/todo-list.css';

export const TodoList = () => {
    return (
        <div className="todo-list">
            <TodoItem />
            <TodoItem />
        </div>
    );
};