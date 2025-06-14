// pages.jsx

'use client';
import { useState } from "react";
import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";

export default function Home() {
  const [value, setValue] = useState(""); 
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!value.trim()) return;
    setTodos([...todos, { id: Date.now(), text: value.trim() }]);
    setValue("");
  };

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));
  const updateTodo = (id, text) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, text } : t)));

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 w-full max-w-md rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>

        <TodoInput value={value} onChange={setValue} onAdd={addTodo} />

        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
