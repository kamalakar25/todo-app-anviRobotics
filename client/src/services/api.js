import axios from 'axios';

const API = axios.create({ baseURL: 'https://todo-app-anvirobotics.onrender.com' });

export const signupUser = (username, password) =>
  API.post('/signup', { username, password });

export const loginUser = (username, password) =>
  API.post('/login', { username, password });

export const getTodos = (token) =>
  API.get('/todos', { headers: { Authorization: token } });

export const createTodo = (text, token) =>
  API.post('/todos', { text }, { headers: { Authorization: token } });

export const updateTodo = (id, text, token) =>
  API.put(`/todos/${id}`, { text }, { headers: { Authorization: token } });

export const deleteTodo = (id, token) =>
  API.delete(`/todos/${id}`, { headers: { Authorization: token } });