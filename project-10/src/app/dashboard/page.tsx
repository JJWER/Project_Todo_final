import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddTask from "@/components/AddTask";
import TodoList from "@/components/TodoList";
import { getAllTodos } from "../../../api";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  const tasks = await getAllTodos();

  return (
    <div className=" min-h-screen mb-1 flex-col items-center justify-between p-24">
      Here, TODO !!
      <AddTask />
      <TodoList task={tasks}/>
    </div>
  );
};

export default Dashboard;