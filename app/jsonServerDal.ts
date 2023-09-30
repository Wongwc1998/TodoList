// jsonServerDal.ts

import axios from "axios";
import { DataAccessLayer, Todo } from "./dataAccessLayer";

export const jsonServerDal: DataAccessLayer = {
  getTodos: async () => {
    const response = await axios.get<Todo[]>("http://localhost:3001/api/todos");
    return response.data;
  },
  toggleTodo: async (id, completed) => {
    await axios.patch(`http://localhost:3001/api/todos/${id}`, { completed });
  },
  deleteTodo: async (id) => {
    await axios.delete(`http://localhost:3001/api/todos/${id}`);
  },
  createTodo: async (title) => {
    await axios.post("http://localhost:3001/api/todos", { title, completed: false });
  },
};
