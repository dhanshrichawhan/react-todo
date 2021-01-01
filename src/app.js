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
    <div className="App">
      <h1>Tasks</h1>
      <div className="input-button">
        <input
          name="todo"
          type="text"
          placeholder="Add new todo..."
          value={currentTodo}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={clearAllHandler}>Clear All</button>
      </div>

      <div className="todos">
        <div className="incomplete-tasks">
          <h3>Incomplete Tasks:</h3>
          {todos
            .filter(({ completed }) => !completed)
            .map(({ id, ...todo }) => (
              <Todo
                key={id}
                statusChangeHandler={() => statusChangeHandler(id)}
                {...todo}
              />
            ))}
        </div>

        <div className="complete-tasks">
          <h3>Completed Tasks:</h3>
          {todos
            .filter(({ completed }) => completed)
            .map(({ id, ...todo }) => (
              <Todo
                key={id}
                statusChangeHandler={() => statusChangeHandler(id)}
                {...todo}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function Todo({ todo, completed, statusChangeHandler }) {
  return (
    <div className="todo">
      <input
        className="todo-checkbox"
        type="checkbox"
        defaultChecked={completed}
        onChange={statusChangeHandler}
      />
      <p
        className={`todo-text ${completed ? 'completed' : ''}`}
        onClick={statusChangeHandler}
      >
        {todo}
      </p>
    </div>
  );
}

export default App;
