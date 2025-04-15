import { useState } from 'react';
import { TodoItemType } from '../types/todo';
import { FaCheckCircle, FaEllipsisV } from 'react-icons/fa';
import '../styles/todo-item.css';
import { FaCircleXmark, FaTrashCan } from 'react-icons/fa6';

type TodoItemProps = {
    todoItem: TodoItemType;
    onToggleCheck: (id: number) => void;
    onEdit: (id: number, newLabel: string) => void;
    onDelete: (id: number) => void;
};

export const TodoItem = ({todoItem, onToggleCheck, onEdit, onDelete}: TodoItemProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editLabel, setEditLabel] = useState(todoItem.label);

    if (isEditing) {
        return (
            <div className='todo-item'>
                <div className="todo-label">
                    <input 
                        type="text" 
                        defaultValue={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                    />
                </div>
                <div className="todo-toolbar">
                    <div className="todo-options">
                        <button 
                            className="todo-button" 
                            onClick={() => {
                                setEditLabel(todoItem.label);
                                setIsEditing(false);
                            }}
                        >
                            <FaCircleXmark size={18} />
                        </button>
                    </div>
                    <div className="todo-options">
                        <button 
                            className="todo-button"
                            onClick={() => {
                                onEdit(todoItem.id, editLabel);
                                setIsEditing(false);
                            }}
                        >
                            <FaCheckCircle size={18} />
                        </button>
                    </div>
                    <div className="todo-options">
                        <button 
                            className="todo-button todo-button-danger"
                            onClick={() => onDelete(todoItem.id)}
                        >
                            <FaTrashCan size={18} />
                        </button>    
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={todoItem.checked ? 'todo-item todo-item-checked' : 'todo-item'}>
            <div className="todo-label"><span>{todoItem.label}</span></div>
            <div className="todo-toolbar">
                <div className="todo-check">
                    <button className="todo-button" onClick={() => onToggleCheck(todoItem.id)}>
                        <FaCheckCircle size={18} />
                    </button>
                </div>
                <div className="todo-options">
                    <button className="todo-button" onClick={() => setIsEditing(true)} >
                        <FaEllipsisV size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
