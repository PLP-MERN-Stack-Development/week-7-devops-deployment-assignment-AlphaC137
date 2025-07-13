import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/tasks">Task Manager</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;
