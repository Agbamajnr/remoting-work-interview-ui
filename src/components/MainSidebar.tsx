import { AlarmClockCheck, Search, CalendarRange } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultFilterCategories, defaultTaskCategories, selectAllTasks } from "core/slicers/tasksSlice";
import { useAppSelector } from "core/hooks";
import { useState } from "react";
import SearchModal from "./task-management/Search";




export default function MainSidebar() {
    const currentLocation = useLocation()
    const navigator = useNavigate()
    const allTasks = useAppSelector(selectAllTasks);


    const [searchModalOpen, setSearchModalOpen] = useState(false)


    return (
        <>
            <Sidebar>
                <SidebarItem onClick={() => {
                    navigator('tasks')
                    setSearchModalOpen(true)
                }} icon={<Search size={20} />} text="Search" alert={false} active={false} />
                <SidebarItem onClick={() => navigator('tasks')} icon={<AlarmClockCheck size={20} />} text="Tasks" alert={allTasks.length > 0} active={currentLocation.pathname.includes('/tasks')} />
                <SidebarItem onClick={() => navigator('calendar')} icon={<CalendarRange size={20} />} text="Calendar" alert={false} active={currentLocation.pathname.includes('/calendar')} />
                {defaultFilterCategories.map(catg => {
                    return <SidebarItem onClick={() => navigator('/category/' + catg.name.toLowerCase())} icon={<img src={catg.icon} className="size-[20px]" />} text={catg.name} active={currentLocation.pathname.includes('/category/' + catg.name.toLowerCase())} alert={false} key={catg.name} />
                })}
                <hr className="my-3" />
                {defaultTaskCategories.map(catg => {
                    return <SidebarItem onClick={() => navigator('/category/' + catg.name.toLowerCase())} icon={<img src={catg.icon} className="size-[20px]" />} text={catg.name} active={currentLocation.pathname.includes('/category/' + catg.name.toLowerCase())} alert={false} key={catg.name} />
                })}
            </Sidebar>


            {
                searchModalOpen && <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center">
                    <div className="absolute w-full h-full bg-black bg-transparent" onClick={() => setSearchModalOpen(false)}></div>
                    <SearchModal onClose={() => setSearchModalOpen(false)} />
                </div>
            }
        </>
    )
}