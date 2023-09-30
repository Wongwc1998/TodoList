// dataAccessLayer.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export const prismaDal: DataAccessLayer = {
  getTodos: async () => {
    return await prisma.todo.findMany();
  },
  toggleTodo: async (id, completed) => {
    await prisma.todo.update({
      where: { id },
      data: { completed },
    });
  },
  deleteTodo: async (id) => {
    await prisma.todo.delete({
      where: { id },
    });
  },
  createTodo: async (title) => {
    await prisma.todo.create({
      data: { title, completed: false },
    });
  },
};
