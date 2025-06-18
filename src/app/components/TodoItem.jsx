// components/TodoItem.js
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";

export default function TodoItem({ todo, onDelete, onUpdate, onToggleComplete }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEditToggle = () => {
    if (editing) onUpdate(todo.id, text);
    setEditing(!editing);
  };

  return (
    <li className="flex items-center bg-gray-100 p-2 rounded">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        className="mr-2"
      />

      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow border px-2 py-1 rounded mr-2"
        />
      ) : (
        <span className={`flex-grow text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}
        </span>
      )}

      <button
        onClick={handleEditToggle}
        className={`px-2 py-1 rounded text-white mr-2 ${
          editing ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"
        }`}
        title={editing ? "Save" : "Edit"}
      >
        <FontAwesomeIcon icon={editing ? faSave : faEdit} />
      </button>

      <button
        onClick={() => onDelete(todo.id)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        title="Delete"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
}
