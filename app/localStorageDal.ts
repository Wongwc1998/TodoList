import { DataAccessLayer, Todo } from "./DalInterface";

export const localStorageDal: DataAccessLayer = {
  getTodos: () => {
    try {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]');
      return Promise.resolve(todos);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  toggleTodo: (id, completed) => {
    try {
      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
      const updatedTodos = todos.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteTodo: (id) => {
    try {
      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
      const updatedTodos = todos.filter(todo => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createTodo: (title) => {
    try {
      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
      const newTodo: Todo = {
        id: new Date().toISOString(),
        title,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      todos.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(todos));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
