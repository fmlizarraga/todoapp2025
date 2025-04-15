import { useState } from 'react';
import { TodoItemType } from './types/todo';
import { Footer, Header, TodoList, Modal, NewTodoForm, AuthForm } from './components';
import './App.css';

const App = () => {

  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (email: string, password: string) => {
    console.log('Login with', email, password);
    setIsAuthenticated(true);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Register with', name, email, password);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsRegistering(false);
    setTodoList([]);
  };

  const handleAddTodo = (label: string) => {
    if (label.trim() === '') return;
    const newTodo: TodoItemType = {
      id: Date.now(),
      label,
      checked: false,
      timestamp: Date.now()
    };
    setTodoList([...todoList, newTodo]);
  };

  const handleToggleCheck = (id: number) => {
    const updatedList = todoList.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTodoList(updatedList);
  };

  const handleEditTodo = (id: number, newLabel: string) => {
    const updatedList = todoList.map(item =>
      item.id === id ? { ...item, label: newLabel } : item
    );
    setTodoList(updatedList);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedList = todoList.filter(item => item.id !== id);
    setTodoList(updatedList);
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <AuthForm
          isRegistering={isRegistering}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onToggleForm={() => setIsRegistering(!isRegistering)}
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
            handleAddTodo(label);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
      <main>
        <TodoList 
          todoItems={todoList} 
          onToggleCheck={handleToggleCheck} 
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
