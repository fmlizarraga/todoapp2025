import { TodoItemType } from './types/todo';
import { Footer, Header, TodoList } from './components';
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

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <TodoList todoItems={TODO_LIST} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
