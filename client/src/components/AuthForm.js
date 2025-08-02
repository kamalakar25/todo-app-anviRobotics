import React, { useState } from 'react';
import { signupUser, loginUser } from '../services/api';

export default function AuthForm({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      if (isLogin) {
        const res = await loginUser(username, password);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
      } else {
        const res = await signupUser(username, password);
        setMessage('Signup successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-3 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        {message && <div className="alert alert-warning mt-3">{message}</div>}
        <div className="text-center mt-3">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="btn btn-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}