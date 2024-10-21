import { useState, useEffect } from 'react';
import './App.css';
import iconIzmen from "./izmen.svg";
import iconDel from "./del.svg";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {

    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleToggleCompleted = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditStart = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editing: true };
      }
      return todo;
    }));
  };

  const handleEditChange = (id, event) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: event.target.value };
      }
      return todo;
    }));
  };

  const handleEditSubmit = (id, event) => {
    event.preventDefault();
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editing: false };
      }
      return todo;
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: todos.length + 1, text: newTodo, completed: false, editing: false }]);
      setNewTodo('');
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input1"
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Создать новую заметку..."
        />
        <button type="submit" className="create">Создать</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="note">
              <label htmlFor="" className='labelKv'>
              <input
                className='input3'
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(todo.id)}
              />
              </label>
              {todo.editing ? (
                <form onSubmit={(event) => handleEditSubmit(todo.id, event)}>
                  <input 
                    className="input2"
                    type="text"
                    value={todo.text}
                    onChange={(event) => handleEditChange(todo.id, event)}
                    autoFocus
                  />
                  <button type="submit">Сохранить</button>
                </form>
              ) : (
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
              )}
            </div>
            <div className="buttonIzmen">
              <button onClick={() => handleEditStart(todo.id)} className="battonList">
                <img src={iconIzmen} alt="изменить" className="izmen-icon" />
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)} className="battonList">
                <img src ={iconDel} alt="удалить" className="del-icon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;