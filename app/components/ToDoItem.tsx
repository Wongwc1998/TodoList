"use client";
type TodoItemProps = {
  id: string;
  title: string;
  completed: boolean;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
};

export default function ToDoItem({
  id,
  title,
  completed,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  return (
    <li key={id} className="flex gap-3 items-center">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={completed}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      ></input>
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-purple-500"
      >
        {title}
      </label>
      <button
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none disabled:line-through"
        onClick={() => deleteTodo(id)} // Use the delete function passed down
      >
        Delete Todo
      </button>
    </li>
  );
}
