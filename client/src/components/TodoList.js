import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import Navbar from './Navbar';

export default function TodoList({ token, setToken }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const username = token;

  const fetchTodos = async () => {
    const res = await getTodos(token);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return;
    const res = await createTodo(text, token);
    setTodos([...todos, res.data]);
    setText('');
  };

  const handleUpdate = async (id) => {
    const newText = prompt('Update todo:', todos.find(t => t.id === id).text);
    if (newText && newText.trim()) {
      const res = await updateTodo(id, newText, token);
      setTodos(todos.map(t => t.id === id ? res.data : t));
    }
  };

  const handleDelete = async (id) => {
    await deleteTodo(id, token);
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="container mt-5">
      <Navbar onLogout={handleLogout} username={username} />
      <div className="card p-4 shadow-sm">
        <h2 className="mb-3">Your Todo List</h2>
        <div className="input-group mb-3">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className="form-control"
            placeholder="New todo"
          />
          <button className="btn btn-success" onClick={handleAdd}>Add</button>
        </div>
        <ul className="list-group">
          {todos.map(todo => (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
              {todo.text}
              <div>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleUpdate(todo.id)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}