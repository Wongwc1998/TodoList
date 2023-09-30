// jsonServerDal.ts

import axios from "axios";
import { DataAccessLayer, Todo } from "./dataAccessLayer";

export const jsonServerDal: DataAccessLayer = {
  getTodos: async () => {
    const response = await axios.get<Todo[]>("/api/todos");
    return response.data;
  },
  toggleTodo: async (id, completed) => {
    await axios.patch(`/api/todos/${id}`, { completed });
  },
  deleteTodo: async (id) => {
    await axios.delete(`/api/todos/${id}`);
  },
  createTodo: async (title) => {
    await axios.post("/api/todos", { title, completed: false });
  },
};
