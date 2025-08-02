import React from 'react';

export default function Navbar({ onLogout, username }) {
  return (
    <nav className="navbar navbar-light bg-light mb-4">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Welcome</span>
        <button className="btn btn-outline-secondary" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}