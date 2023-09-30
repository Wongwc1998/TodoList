import { PrismaClient } from "@prisma/client";
import { DataAccessLayer } from "./DalInterface";

const prisma = new PrismaClient();

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
  createTodo: async (title: string) => {
    await prisma.todo.create({
      data: { title, completed: false },
    });
  },
};
