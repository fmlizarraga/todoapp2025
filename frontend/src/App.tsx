import { useState } from 'react';
import { Footer, Header, TodoList, Modal, NewTodoForm, AuthForm } from './components';
import { useAuth, useTodoList } from './hooks';
import './App.css';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        isAuthenticated,
        isRegistering,
        login,
        register,
        logout,
        toggleForm
    } = useAuth();

    const {
        todoList,
        addTodo,
        toggleCheck,
        editTodo,
        deleteTodo,
        resetList
    } = useTodoList();

    const handleLogout = () => {
        logout();
        resetList();
    };

    if (!isAuthenticated) {
        return (
            <div className="auth-container">
                <AuthForm
                isRegistering={isRegistering}
                onLogin={login}
                onRegister={register}
                onToggleForm={toggleForm}
                />
            </div>
        );
    }

    return (
        <>
            <header>
                <Header 
                onAdd={() => setIsModalOpen(true)}
                onLogout={handleLogout}
                />
            </header>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <NewTodoForm 
                onAdd={(label) => {
                    addTodo(label);
                    setIsModalOpen(false);
                }}
                onCancel={() => setIsModalOpen(false)} 
                />
            </Modal>
            <main>
                <TodoList 
                todoItems={todoList} 
                onToggleCheck={toggleCheck} 
                onEdit={editTodo}
                onDelete={deleteTodo}
                />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default App;
