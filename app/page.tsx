import Link from "next/link";
import { prisma } from "./db";
import ToDoList from "./components/ToDoList";
import { DataAccessLayer } from "./dataAccessLayer";
// Import the DAL you want to use
// import { prismaDal } from "./dataAccessLayer";
// OR
import { jsonServerDal } from "./jsonServerDal";
const dal: DataAccessLayer = jsonServerDal;
  async function toggleTodo(id: string, completed: boolean) {
    "use server"
    await dal.toggleTodo(id, completed);
  }

  async function deleteTodo(id: string) {
    "use server"
    await dal.deleteTodo(id);
  }

export default async function Home() {
  // const dal: DataAccessLayer = prismaDal; // or jsonServerDal
  const todos = await dal.getTodos();
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
