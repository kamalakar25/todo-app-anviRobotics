import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import TodoList from './components/TodoList';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
  }, [token]);

  return (
    <div>
      {!token ? (
        <AuthForm setToken={setToken} />
      ) : (
        <TodoList token={token} setToken={setToken} />
      )}
    </div>
  );
}

export default App;