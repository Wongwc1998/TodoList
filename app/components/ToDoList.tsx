"use client";
import ToDoItem from "./ToDoItem";
import { useState } from "react";
type TodoItemProps = {
  todos: {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
};


export default function ToDoList({
  todos,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  const [todosList, setTodosList] = useState(todos);
  const handleDelete = (id: string) => {
    setTodosList((prevList) => prevList.filter((todo) => todo.id !== id));
    deleteTodo(id); // Make sure to sync with the database
  };
  return (
    <>
      <ul className="px-4">
        {todosList.map((todo) => (
          <ToDoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={handleDelete} // Pass the local delete handler
          />
        ))}
      </ul>
    </>
  );
}
