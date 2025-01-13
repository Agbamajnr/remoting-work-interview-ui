import { AlarmClockCheck, Search, CalendarRange, ListTodo, BadgePlusIcon } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import UpcomingIcon from '../assets/icons/sidebar-upcoming-icon.png'
import WorkIcon from '../assets/icons/sidebar-work-icon.png'
import PersonalIcon from '../assets/icons/sidebar-personal-icon.png'
import CompletedIcon from '../assets/icons/sidebar-completed-icon.png'
import { useLocation } from "react-router-dom";



export default function MainSidebar() {
    const currentLocation = useLocation()

    return (
        <Sidebar>
            <div className="relative flex items-center pt-1.5 pb-3 px-3 my-1 font-medium rounded-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-indigo-600">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                </svg>

            </div>
            <SidebarItem icon={<Search size={20} />} text="Search" alert={false} active={false} />
            <SidebarItem icon={<AlarmClockCheck size={20} />} text="Tasks" alert={false} active={currentLocation.pathname.includes('/tasks')} />
            <SidebarItem icon={<CalendarRange size={20} />} text="Calendar" active={false} alert={currentLocation.pathname.includes('/calendar')} />
            <hr className="my-3" />
            <SidebarItem icon={<img src={UpcomingIcon} className="size-[20px]" />} text="Upcoming" active={false} alert={false} />
            <SidebarItem icon={<img src={WorkIcon} className="size-[20px]" />} text="Work" active={false} alert={false} />
            <SidebarItem icon={<img src={PersonalIcon} className="size-[20px]" />} text="Personal" active={false} alert={false} />
            <SidebarItem icon={<img src={CompletedIcon} className="size-[20px]" />} text="Completed" active={false} alert={false} />
        </Sidebar>
    )
}