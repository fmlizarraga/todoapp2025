import { TodoItemType } from '../types/todo';
import { FaCheckCircle, FaEllipsisV } from 'react-icons/fa';
import '../styles/todo-item.css';

type TodoItemProps = {
    todoItem: TodoItemType;
};

export const TodoItem = ({todoItem}: TodoItemProps) => {
    return (
        <div className={todoItem.chacked ? 'todo-item todo-item-checked' : 'todo-item'}>
            <div className="todo-label"><span>{todoItem.label}</span></div>
            <div className="todo-toolbar">
                <div className="todo-check">
                    <button className="todo-button">
                        <FaCheckCircle size={18} />
                    </button>
                </div>
                <div className="todo-options">
                    <button className="todo-button">
                        <FaEllipsisV size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
