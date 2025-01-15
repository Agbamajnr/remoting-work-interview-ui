import { PanelLeft } from "lucide-react"
import logo from "../assets/logo.svg"
import AvatarImg from "../assets/images/thumbs-up-guy.png"
import { createContext, useContext, useState } from "react"
import { useAppDispatch, useAppSelector } from "core/hooks";
import { selectActiveUser, selectAppTheme, updateAppTheme } from "core/slicers/settingsSlice";
import AddTask from "./task-management/AddTask";

const SidebarContext = createContext<{ expanded: boolean }>({ expanded: true });

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true)
    const [addTaskModalOpen, setAddTaskModalState] = useState(false)

    const isDark = useAppSelector(selectAppTheme)
    const activeUser = useAppSelector(selectActiveUser)
    const storeDispatch = useAppDispatch()

    const darkModeHandler = () => {
        storeDispatch(updateAppTheme(!isDark ? 'dark' : 'light'))
    }
    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col dark:dark-background border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        {
                            expanded ?
                                <div className="flex flex-row gap-x-2 pl-1.5">
                                    <img src={logo} className={`overflow-hidden transition-all w-6`} />
                                    <span className="text-lg text-indigo-800 dark:text-indigo-300">TASKIFY</span>
                                </div>
                                : null
                        }
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            <PanelLeft />
                        </button>
                    </div>

                    {
                        expanded
                            ? <div className="relative flex items-center pt-1.5 pb-3 px-6 gap-x-2 my-1 font-medium rounded-md cursor-pointer" onClick={() => setAddTaskModalState(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-indigo-600">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                                </svg>

                                <span className="text-indigo-600 textt-xs">Add task</span>

                            </div>
                            : null
                    }


                    <SidebarContext.Provider value={{ expanded }}>

                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    {
                        activeUser
                        && <div className="border-t flex p-3">
                            <img src={AvatarImg} className="w-10 h-10 rounded-md" />
                            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
                                <div className="leading-4">
                                    <h4 className="font-semibold text-nowrap text-ellipsis dark:text-gray-300">{activeUser?.name}</h4>
                                    <span className="text-xs text-gray-500 text-nowrap text-ellipsis">{activeUser?.email}</span>
                                </div>

                                <button onClick={() => darkModeHandler()} className="transition-all">
                                    {
                                        isDark
                                            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6 text-gray-300">
                                                <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clipRule="evenodd" />
                                            </svg>
                                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                                            </svg>

                                    }
                                </button>

                            </div>
                        </div>
                    }

                </nav>
            </aside>


            {/* add task modal */}
            {
                addTaskModalOpen && <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center">
                    <div className="absolute w-full h-full bg-black bg-transparent" onClick={() => setAddTaskModalState(false)}></div>
                    <div className="shadow-sm bg-white dark:bg-gray-800 rounded-lg min-w-[600px] z-20 h-fit">
                        <AddTask onCancel={() => setAddTaskModalState(false)} onTaskAdded={() => setAddTaskModalState(false)} />
                    </div>
                </div>
            }

        </>
    )
}

export function SidebarItem({ icon, text, active, alert, onClick }: { icon: React.ReactNode, text: string, active: boolean, alert: boolean, onClick?: () => void }) {
    const { expanded } = useContext(SidebarContext)
    return (
        <li onClick={onClick} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    )
}