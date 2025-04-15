import { useState } from 'react';
import '../styles/new-todo-form.css';

type NewTodoFormProps = {
    onAdd: (label: string) => void;
    onCancel: () => void;
};

export const NewTodoForm = ({ onAdd, onCancel }: NewTodoFormProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        onAdd(inputValue.trim());
        setInputValue('');
    };

    return (
        <form className="new-todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a task..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Add</button>
            <button type="button" className='cancel' onClick={onCancel}>Cancel</button>
        </form>
    );
};
