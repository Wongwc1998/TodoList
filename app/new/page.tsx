import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation"

async function createTodo(data: FormData) {
  "use server";

  const titleValue = data.get("title")?.valueOf();
  if (typeof titleValue !== "string" || titleValue.length === 0) {
    throw new Error("Invalid Title")
  }

  await prisma.todo.create({data: {title: titleValue, completed: false}});
  
  console.log(titleValue);
  redirect("/")
}

export default function New() {
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">New</h1>
      </header>
      <form className="flex flex-col gap-2" action={createTodo}>
        <input
          type="text"
          name="title"
          className="bg-transparent border rounded px-2 py-1 border-slate-300 outline-none  focus-within:border-slate-100"
        />
        <div className="flex flex-row gap-3 justify-end mt-3">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 bg-green-500 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
