import { useAppDispatch } from "core/hooks";
import { Task, taskCompletionUpdate, taskDeleted } from "core/slicers/tasksSlice";
import { format, toDate } from "date-fns";
import { Checkbox } from "flowbite-react";
import { Calendar, CircleCheckBig, GripVertical, PencilLine, Plus, Trash } from "lucide-react";
import { CSSProperties, useState } from "react";
import VirtualList from 'react-virtual-drag-list';
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import 'assets/css/index.css'

import axios from 'axios'

const BASE_URL = 'http://localhost:3333/api/v1/task'

export default function TaskDisplay({ headerLabel, filteredTasks }: { headerLabel: string, filteredTasks: Task[] }) {

    const overdueTasks = filteredTasks.filter(task => {
        return (toDate(format(task.deadline, 'MM/dd/yyyy')) < toDate(format(new Date(), 'MM/dd/yyyy')) && !task.completed);
    })
    const upcomingTasks = filteredTasks.filter(task => {
        return toDate(format(task.deadline, 'MM/dd/yyyy')) >= toDate(format(new Date(), 'MM/dd/yyyy'));
    })

    const [addTaskModalOpen, setAddTaskModalState] = useState(false)


    return (
        <div className="flex w-full flex-col items-start justify-start overflow-scroll overflow-x-scroll pb-4 no-scroll-btn">
            <h1 className="text-3xl font-semibold text-gray-950 dark:text-gray-200">{headerLabel}</h1>
            <div className="flex flex-row items-center mt-1.5 gap-x-1">
                <CircleCheckBig size={14} color="#d1d5db" />
                <p className="text-sm text-gray-300">{filteredTasks.length} tasks</p>
            </div>


            {/* list */}

            {
                headerLabel === 'Tasks'
                    ?
                    overdueTasks.length > 0
                        ? <div className="flex flex-col items-center w-full mt-4 gap-y-2">
                            <div className="border-b py-1 flex flex-row items-center w-full">
                                <h3 className="text-sm font-semibold text-black dark:text-gray-200">Overdue</h3>
                            </div>

                            <TasksList listSource={overdueTasks} />
                        </div>
                        : upcomingTasks.length > 0
                            ? <div className="flex flex-col items-center w-full mt-6 gap-y-2">
                                <div className="px-5 w-full">
                                    <div className="border-b py-1 flex flex-row items-center w-full">
                                        <h3 className="text-sm font-semibold text-black dark:text-gray-200">Upcoming</h3>
                                    </div>
                                </div>

                                <TasksList listSource={upcomingTasks} />
                            </div>
                            : null

                    : filteredTasks.length > 0
                        ? <div className="flex flex-col items-center w-full mt-6 gap-y-2">
                            <TasksList listSource={filteredTasks} />
                        </div>
                        : null
            }
            {
                !addTaskModalOpen
                    ? <div className="w-full flex flex-row items-center gap-x-3 cursor-pointer mt-4" onClick={() => setAddTaskModalState(true)}>
                        <Plus size={20} className="dark:text-gray-200" />
                        <span className="text-gray-500 text-sm hover:text-indigo-500">Add task</span>
                    </div>
                    : <div className="w-full h-fit py-2 flex flex-row justify-center">
                        <div className="w-[90%] border rounded-lg">
                            <AddTask onCancel={() => setAddTaskModalState(false)} onTaskAdded={() => setAddTaskModalState(false)} />
                        </div>
                    </div>
            }






        </div>
    )
}


function TasksList({ listSource }: { listSource: Task[] }) {
    const storeDispatch = useAppDispatch()
    const [editBoxesOpen, setEditBoxesOpen] = useState<string[]>([])

    const deleteTaskOnServer = async (taskId: string) => {
        try {
            const response = await axios.delete(BASE_URL + `/${taskId}`)
            return response;
        } catch (error) {
            return error;
        }
    }


    return (
        <VirtualList
            className="virtual-list w-full"
            style={{ overflow: 'hidden' } as CSSStyleDeclaration}
            dataKey="id"
            dataSource={listSource}
            handle=".handle"
            direction="vertical"
        >
            {
                (record, index, dataKey) => {

                    return (
                        !editBoxesOpen.includes(record.id)
                            ? <div className="flex flex-row items-start w-full h-fit gap-x-2 py-3" id={record.id}>
                                <GripVertical size={20} className="handle cursor-grabbing dark:text-gray-200" />
                                <Checkbox className="rounded-full cursor-pointer" checked={record.completed} onChange={(e) => {
                                    storeDispatch(taskCompletionUpdate({ taskId: record.id, status: e.currentTarget.checked }))

                                }} />
                                <div className=" border-b w-full flex flex-row justify-between items-start h-full">
                                    <div className="details flex flex-col items-start gap-y-1 pb-1">
                                        <h2 className="text-sm font-medium dark:text-gray-100">{record.taskName}</h2>
                                        {
                                            record.taskDescription.length > 0
                                                ? <h4 className="text-xs text-gray-400 font-medium dark:text-gray-300">{record.taskDescription}</h4>
                                                : null
                                        }

                                        <div className="border rounded-lg py-1.5 px-3 gap-x-1 flex flex-row items-center mt-2">
                                            <Calendar size={15} className="dark:text-gray-200" />

                                            <span className="text-sm font-medium dark:text-gray-200">{format(record.deadline, 'MMM dd')}</span>
                                        </div>

                                    </div>

                                    <div className="options flex flex-row items-center space-x-3">
                                        <div className="rounded-lg p-1 hover:bg-neutral-300 dark:hover:bg-slate-500 cursor-pointer" onClick={() => {
                                            setEditBoxesOpen((value) => {
                                                return [...value, record.id]
                                            })
                                        }}>
                                            <PencilLine size={20} className="dark:text-gray-200" />
                                        </div>
                                        <div className="rounded-lg p-1 hover:bg-neutral-300 dark:hover:bg-slate-500 cursor-pointer" onClick={() => {
                                            deleteTaskOnServer(record.id)
                                            storeDispatch(taskDeleted({ taskId: record.id }))
                                        }}>
                                            <Trash size={20} className="dark:text-gray-200" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div className="w-full h-fit py-2 flex flex-row justify-center">
                                <div className="w-[90%] border rounded-lg">
                                    <EditTask onCancel={() => setEditBoxesOpen((value) => {
                                        return value.filter(v => {
                                            return v !== record.id
                                        })
                                    })} onTaskEdited={() => setEditBoxesOpen((value) => {
                                        return value.filter(v => {
                                            return v !== record.id
                                        })
                                    })} taskToEdit={record} />
                                </div>
                            </div>
                    )
                }
            }
        </VirtualList>
    )
}
