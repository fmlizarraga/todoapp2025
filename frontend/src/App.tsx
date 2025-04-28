import { useEffect, useState } from 'react';
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
        checkAuth,
        toggleForm
    } = useAuth();
    
    const {
        todoList,
        addTodo,
        toggleCheck,
        editTodo,
        deleteTodo,
        resetList,
        page,
        setPage,    
        limit,
        total,
        getTodos
    } = useTodoList();

    const handlePreviousPage = () => setPage(p => p - 1);
    const handleNextPage = () => setPage(p => p + 1);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            checkAuth();
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            getTodos();
        }
    }, [isAuthenticated, page, limit]);
    
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
                    onNextPage={handleNextPage}
                    onPreviousPage={handlePreviousPage}
                    page={page}
                    limit={limit}
                    total={total}
                />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default App;
