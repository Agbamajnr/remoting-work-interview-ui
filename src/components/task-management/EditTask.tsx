import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "core/hooks";
import { selectActiveUser } from "core/slicers/settingsSlice";
import { defaultTaskCategories, Task, taskAdded, TaskCategory, taskUpdated } from "core/slicers/tasksSlice";
import { Datepicker, Dropdown } from "flowbite-react";
import { ChevronsLeftRight, Tags } from "lucide-react";
import { useState } from "react";

export default function EditTask({ onCancel, onTaskEdited, taskToEdit }: { onCancel: () => void, onTaskEdited?: (editedTask: Task) => void, taskToEdit: Task }) {
    // const activeUser = useAppSelector(selectActiveUser)
    const storeDispatch = useAppDispatch()

    const [keywordsInputOpen, setKeywordsInputOpen] = useState(false)


    const [selectedCategory, setSelectedCategory] = useState<TaskCategory>(taskToEdit.category)

    const [taskDescription, setTaskDescription] = useState(taskToEdit.taskDescription)
    const [taskName, setTaskName] = useState(taskToEdit.taskName)
    const [taskDate, setTaskDate] = useState(taskToEdit.deadline)

    const [keywords, setKeywords] = useState<string[]>(taskToEdit.keywords)

    function handleSubmit() {
        const editedTask: Task = {
            userId: taskToEdit.userId,
            id: taskToEdit.id,
            taskName: taskName,
            taskDescription: taskDescription,
            deadline: taskDate,
            keywords: keywords,
            completed: taskToEdit.completed,
            createdAt: taskToEdit.createdAt,
            category: selectedCategory
        }

        storeDispatch(taskUpdated(editedTask))

        if (onTaskEdited != null) {
            onTaskEdited(editedTask)
        }
    }

    return (
        <div className="flex h-full flex-col w-full divide-y justify-between">
            {/* form widget */}

            <div className="flex flex-col w-full h-full px-[20px] pb-[10px]">
                <input value={taskName} onChange={(e) => setTaskName(e.target.value)} className="w-full text-sm font-medium rounded !outline-none pt-3 !border-none focus:outline-none focus:border-none" placeholder="What do have going on?" />
                <input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full text-xs rounded !outline-none !border-none pt-2 focus:outline-none focus:border-none" placeholder="Description" />

                <div className="flex flex-row items-center mt-4 gap-x-3">
                    <Datepicker minDate={new Date()} onChange={(date) => {
                        if (date != null) {
                            setTaskDate(date)
                        }
                    }} value={new Date(taskDate)} theme={{
                        "root": {
                            'base': "relative w-fit max-w-[200px]"
                        }
                    }} />
                    <div className="border rounded-lg py-2 px-3 gap-x-1 flex flex-row items-center" onClick={() => setKeywordsInputOpen(!keywordsInputOpen)}>
                        {
                            keywords.length === 0
                                ? <Tags size={14} />
                                : <span className="text-sm font-semibold">{keywords.length}</span>
                        }

                        <span className="text-sm font-medium">Keywords</span>

                        <ChevronsLeftRight size={15} className="ml-4" />
                    </div>

                    {/* keywords input box */}
                    {
                        keywordsInputOpen
                        && <div className="border rounded-lg py-2.5 px-3 gap-x-1 flex flex-row items-center">
                            <input defaultValue={keywords.join(', ')} className="w-full h-full text-sm border-none outline-none" onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    setKeywords(e.target.value.trim().split(','))
                                }
                            }} placeholder="e.g workspace, terrific, instant, important" />
                        </div>
                    }

                </div>
            </div>

            {/* actions widget */}
            <div className="w-full flex flex-row items-center justify-between h-[60px] px-[20px] py-[10px]">
                <Dropdown label={selectedCategory.name} dismissOnClick={true}>
                    {defaultTaskCategories.map(catg => {
                        if (catg != selectedCategory) {
                            return <Dropdown.Item onClick={() => setSelectedCategory(catg)} key={catg.name}>
                                <div className="flex flex-row items-center gap-x-2">
                                    <img src={catg.icon} alt="" className="size-6" />
                                    <span>{catg.name}</span>
                                </div>
                            </Dropdown.Item>
                        }
                    })}
                </Dropdown>
                <div className="flex flex-row items-center gap-x-3">
                    <button onClick={onCancel} type="button" className="text-gray-900 bg-white border border-gray-300 outline-none hover:bg-gray-100  font-medium rounded text-sm px-8 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 ">Cancel</button>
                    <button onClick={handleSubmit} disabled={taskName.length < 2}
                        className={`${taskName.length > 2 ? "bg-[#3062a3]" : "bg-[#a5ccff]"} text-white px-8 py-2 rounded`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>

    )
}