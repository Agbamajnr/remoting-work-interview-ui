import { AlarmClockCheck, Search, CalendarRange } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { useLocation } from "react-router-dom";
import { defaultFilterCategories, defaultTaskCategories } from "core/slicers/tasksSlice";



export default function MainSidebar() {
    const currentLocation = useLocation()

    return (
        <Sidebar>
            <SidebarItem icon={<Search size={20} />} text="Search" alert={false} active={false} />
            <SidebarItem icon={<AlarmClockCheck size={20} />} text="Tasks" alert={false} active={currentLocation.pathname.includes('/tasks')} />
            <SidebarItem icon={<CalendarRange size={20} />} text="Calendar" active={false} alert={currentLocation.pathname.includes('/calendar')} />
            {defaultFilterCategories.map(task => {
                return <SidebarItem icon={<img src={task.icon} className="size-[20px]" />} text={task.name} active={false} alert={false} key={task.name} />
            })}
            <hr className="my-3" />
            {defaultTaskCategories.map(task => {
                return <SidebarItem icon={<img src={task.icon} className="size-[20px]" />} text={task.name} active={false} alert={false} key={task.name} />
            })}
        </Sidebar>
    )
}