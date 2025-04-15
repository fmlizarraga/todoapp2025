import { useState } from 'react';
import { TodoItemType } from './types/todo';
import { Footer, Header, TodoList, Modal, NewTodoForm } from './components';
import './App.css';

const TODO_LIST: TodoItemType[] = [
  {
    id: 1,
    label: 'Task 1',
    checked: false,
    timestamp: Date.now()
  },
  {
    id: 2,
    label: 'Task 2',
    checked: true,
    timestamp: Date.now()
  }
];

const App = () => {

  const [todoList, setTodoList] = useState<TodoItemType[]>(TODO_LIST);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <header>
        <Header onAdd={() => setIsModalOpen(true)}/>
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
