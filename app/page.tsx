import Link from "next/link";
import { prisma } from "./db";
import ToDoList from "./components/ToDoList";

async function getTodos() {
  return await prisma.todo.findMany();
}

async function toggleTodo(id: string, completed: boolean) {
  "use server"
  await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      completed: completed,
    },
  });
}

async function deleteTodo(id: string) {
  "use server"
  await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  getTodos();
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Todos</h1>
        <Link
          href="./new"
          className="border text-slate-300 border-slate-300 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-slate-300 focus-within:bg-slate-700 outline-none"
        >
          New
        </Link>
      </header>
      <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  );
}
