import { useAppSelector } from "core/hooks";
import { defaultTaskCategories, selectAllTasks } from "core/slicers/tasksSlice";
import { format } from "date-fns";
import { BookmarkCheck, Calendar, Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NothingFound from 'assets/images/nothing_found.svg'

export default function SearchModal({ onClose }: { onClose: () => void }) {

    const [searchText, setSearchText] = useState('')
    const navigator = useNavigate()

    const allTasks = useAppSelector(selectAllTasks);

    const [filteredCategories, setFilteredCategories] = useState(defaultTaskCategories)
    const [filteredTasks, setFilteredTasks] = useState(allTasks)

    function runSearch() {
        if (searchText.length > 0) {
            // run search for categories
            const filteredCatg = defaultTaskCategories.filter(catg => {
                return catg.name.toLowerCase().includes(searchText.toLowerCase())
            })
            setFilteredCategories(filteredCatg)

            // run search for tasks and keywords
            const filteredTasksBlock = allTasks.filter(task => {
                return task.taskName.toLowerCase().includes(searchText.toLowerCase())
                    || task.taskDescription.toLowerCase().includes(searchText.toLowerCase())
                    || task.keywords.includes(searchText)
                    || task.deadline.toString().includes(searchText.toLowerCase())
            })
            setFilteredTasks(filteredTasksBlock)
        } else {
            setFilteredCategories(defaultTaskCategories)
            setFilteredTasks(allTasks)
        }
    }

    useEffect(() => {
        runSearch()
    }, [searchText])

    return (
        <div className="shadow bg-white dark:bg-gray-800 rounded-lg xl:w-[600px] lg:w-[500px] w-[350px] z-30 h-[400px] flex flex-col items-center">
            {/* search header */}
            <div className="w-full py-3 px-[20px] border-b flex items-center flex-row gap-x-2">
                <SearchIcon size={20} />
                <input onChange={(e) => {
                    setSearchText(e.target.value)
                }} placeholder="Search by keywords, categories or tasks" className="outline-none border-none text-sm placeholder:text-gray-400 w-full bg-transparent" />
            </div>

            {/* all lists */}

            <div className="flex flex-col w-full h-full overflow-scroll">
                {/* categories */}
                {
                    filteredCategories.length > 0
                        ? <div className="flex flex-col w-full h-fit py-3 border-b">
                            <h3 className="text-xs text-gray-500 px-[20px]">Categories</h3>

                            <div className="flex flex-col w-full h-fit mt-2 gap-y-1">
                                {
                                    filteredCategories.map(catg => {
                                        return <div onClick={() => {
                                            onClose()
                                            navigator('/category/' + catg.name.toLowerCase())
                                        }} className="hover:bg-gray-200 transition-all px-[20px] py-2 flex flex-row items-start gap-x-3 cursor-pointer">
                                            <img src={catg.icon} className="size-5" alt="" />
                                            <div className="flex flex-col items-start">
                                                <h3 className="text-sm text-gray-600">{catg.name}</h3>
                                                <p className="text-xs text-gray-400">{catg.description}</p>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        : null
                }


                {/* all tasks */}
                {
                    filteredTasks.length > 0
                        ? <div className="flex flex-col w-full h-fit py-3 border-b">
                            <h3 className="text-xs text-gray-500 px-[20px]">Recent Tasks</h3>

                            <div className="flex flex-col w-full h-fit mt-2 gap-y-1">
                                {
                                    filteredTasks.map(task => {
                                        return <div onClick={() => {
                                            onClose()
                                            navigator('/tasks#' + task.id)
                                        }} className="hover:bg-gray-200 transition-all px-[20px] py-2 flex flex-row items-start justify-between cursor-pointer">
                                            <div className="flex flex-row items-start gap-x-3">
                                                <BookmarkCheck size={16} />
                                                <div className="flex flex-col items-start">
                                                    <h3 className="text-sm text-gray-600">{task.taskName}</h3>
                                                    <p className="text-xs text-gray-400">{task.taskDescription.length > 0 ? task.taskDescription : '..........'}</p>
                                                </div>
                                            </div>

                                            <div className="border rounded-lg py-1.5 px-3 gap-x-1 flex flex-row items-center mt-2">
                                                <Calendar size={15} />

                                                <span className="text-sm font-medium">{format(task.deadline, 'MMM dd')}</span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        : null
                }

                {
                    filteredTasks.length === 0 && filteredCategories.length === 0
                        ? <div className="w-full h-full flex flex-col items-center justify-center">
                            <img src={NothingFound} className="size-[100px]" alt="" />
                            <span className="text-lg text-gray-400">Query not found!</span>
                        </div>
                        : null
                }

            </div>
        </div>
    );
}