// components/TodoInput.jsx

export default function TodoInput({ value, onChange, onAdd }) {
  return (
    <div className="flex mb-4">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add a new task"
        className="flex-grow border px-4 py-2 rounded-l"
      />
      <button
        onClick={onAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
}
