import { v4 as randomId } from 'uuid';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [currentTodo, setCurrentTodo] = useLocalStorage('currentTodo', '');
  const [todos, setTodos] = useLocalStorage('todos', []);

  const onChangeHandler = e => setCurrentTodo(e.target.value);

  const onKeyDownHandler = e => {
    if (e.key === 'Enter') {
      setTodos([
        {
          id: randomId(),
          todo: currentTodo,
          completed: false,
        },
        ...todos,
      ]);
      setCurrentTodo('');
    }
  };

  const clearAllHandler = () => {
    setTodos([]);
    setCurrentTodo('');
  };

  const statusChangeHandler = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="main">
      <div className="container">
        <h1 className="heading">Tasks</h1>

        <div>
          <input
            name="todo"
            type="text"
            placeholder="Add new todo..."
            value={currentTodo}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
          />

          <button onClick={clearAllHandler}>clear all</button>
        </div>

        <div>
          <p>Incomplete Tasks</p>
          <ul className="list incomplete">
            {todos
              .filter(({ completed }) => !completed)
              .map(({ id, ...todo }) => (
                <Todo
                  key={id}
                  statusChangeHandler={() => statusChangeHandler(id)}
                  {...todo}
                />
              ))}
          </ul>
        </div>

        <div>
          <p>Completed Tasks</p>
          <ul className="list incomplete">
            {todos
              .filter(({ completed }) => completed)
              .map(({ id, ...todo }) => (
                <Todo
                  key={id}
                  statusChangeHandler={() => statusChangeHandler(id)}
                  {...todo}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Todo({ todo, statusChangeHandler }) {
  return <li onClick={statusChangeHandler}>{todo}</li>;
}

export default App;
