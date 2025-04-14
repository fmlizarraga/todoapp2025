import { Footer, Header, TodoList } from './components';
import './App.css';

const App = () => {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <TodoList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
