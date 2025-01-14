import { AlarmClockCheck, Search, CalendarRange } from "lucide-react";
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