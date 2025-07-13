import React, { useState, useEffect } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setTasks(data);
        else setError(data.error || 'Failed to fetch tasks');
      } catch {
        setError('Network error');
      }
    };
    if (token) fetchTasks();
  }, [token]);

  // Create task
  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, status })
      });
      const data = await res.json();
      if (res.ok) setTasks([...tasks, data]);
      else setError(data.error || 'Failed to create task');
    } catch {
      setError('Network error');
    }
  };

  // Update task
  const handleUpdate = async (id, newStatus) => {
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok) setTasks(tasks.map(t => t._id === id ? data : t));
      else setError(data.error || 'Failed to update task');
    } catch {
      setError('Network error');
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setTasks(tasks.filter(t => t._id !== id));
      else {
        const data = await res.json();
        setError(data.error || 'Failed to delete task');
      }
    } catch {
      setError('Network error');
    }
  };

  if (!token) return <p>Please log in to manage tasks.</p>;

  return (
    <div>
      <h2>Task Management</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status}
            <button onClick={() => handleUpdate(task._id, task.status === 'pending' ? 'completed' : 'pending')}>
              Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
            </button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
