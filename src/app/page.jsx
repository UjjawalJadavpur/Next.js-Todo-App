
// src/app/page.jsx

'use client';
import { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import useAuthStore from './store/useAuthStore';
import AuthPage from './components/AuthPage';

export default function Page() {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const { user, token, logout, setUser } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Optionally verify token with backend
      setUser({ name: 'User' }, storedToken);
    }
  }, []);

  const addTodo = () => {
    if (!value.trim()) return;
    setTodos([...todos, { id: Date.now(), text: value.trim(), completed: false }]);
    setValue('');
  };

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));
  const updateTodo = (id, text) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, text } : t)));
  const toggleComplete = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
  };

  if (!user) return <AuthPage onLogin={setUser} />;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 w-full max-w-md rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Todo App</h1>
          <button onClick={handleLogout} className="text-red-600 underline text-sm">
            Logout
          </button>
        </div>

        <TodoInput value={value} onChange={setValue} onAdd={addTodo} />
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              onToggleComplete={toggleComplete}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
