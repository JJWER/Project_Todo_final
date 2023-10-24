"use client"

import { ITask } from "../../types/tasks"
import { FiEdit,FiTrash2 } from "react-icons/fi"
import Modal from "./Modal"
import { FormEventHandler, useState } from "react"
import { useRouter } from "next/navigation"
import { deleteTodo, editTodo } from "../../api"


interface TaskProps {
    task:ITask
}

const Task:React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setModalEdit] = useState<boolean>(false);
  const [openModalDeleted,setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
        id:task.id,
        text: taskToEdit
    });
   setTaskToEdit("");
    setModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id:string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  }

  return (
    <tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-6">
          <FiEdit 
          onClick={() =>setModalEdit(true)} 
          cursor="pointer"
          size={15}/>
          <Modal modalOpen={openModalEdit} setModalOpen={setModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
                <h3 className="font-bold text-lg">Edit task</h3>
                <div className="modal-action">
                <input 
                    value={taskToEdit}
                    onChange={(e) => setTaskToEdit(e.target.value)}
                    type='text'
                    placeholder='Type here'
                    className='input input-bordered w-full'
                />
                <button type="submit"className="btn">Submit</button>
                </div>
            </form>
        </Modal>
          <FiTrash2 
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          size={15}/>
          <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
           <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
           <div className="modal-action">
            <button 
              onClick={() =>handleDeleteTask(task.id)}
              className="btn"
            >Yes</button>

           </div>
          </Modal>

        </td>
    </tr>
  )
}

export default Task