import { FaCheckCircle, FaEllipsisV } from 'react-icons/fa';
import '../styles/todo-item.css';

export const TodoItem = () => {
    return (
        <div className="todo-item">
            <div className="todo-label"><span>Item 1</span></div>
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
