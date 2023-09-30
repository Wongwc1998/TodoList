export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataAccessLayer {
  getTodos: () => Promise<Todo[]>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  createTodo: (title: string) => Promise<void>;
}