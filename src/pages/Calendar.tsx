import { Calendar as BigCalendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import { enUS } from 'date-fns/locale/en-US'
import { useAppSelector } from 'core/hooks'
import { selectAllTasks } from 'core/slicers/tasksSlice'

import 'react-big-calendar/lib/css/react-big-calendar.css';


const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})


export default function Calendar() {
    const allTasks = useAppSelector(selectAllTasks);

    const taskToUse = allTasks.filter(task => {
        return task.completed == true;
    })

    const eventsList: Event[] = taskToUse.map(task => {
        return {
            title: `${task.taskName} \n ${task.taskDescription.length > 0 ? `- ${task.taskDescription}` : ''}`,
            start: new Date(task.createdAt),
            end: new Date(task.deadline),
            allDay: true
        }
    })
    return (
        <>
            <div className='p-2'>
                <BigCalendar
                    localizer={localizer}
                    events={eventsList}
                    startAccessor="start"
                    endAccessor="end"
                    showAllEvents={true}
                    style={{ height: 600 }}
                />
            </div>
        </>
    )
}
