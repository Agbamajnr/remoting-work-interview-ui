import TaskDisplay from 'components/task-management/TaskDisplay';
import { useAppSelector } from 'core/hooks';
import { selectAllTasks } from 'core/slicers/tasksSlice';
import { format, toDate } from 'date-fns';
import React, { useState } from 'react';

const UpcomingTasks: React.FC = () => {
    // State to hold the list of tasks
    const allTasks = useAppSelector(selectAllTasks)

    const upcomingTasks = allTasks.filter(task => {
        return (toDate(format(task.deadline, 'MM/dd/yyyy')) >= toDate(format(new Date(), 'MM/dd/yyyy')) && !task.completed);
    })

    return (
        <>
            <div className='flex flex-col w-full items-center h-full'>
                <div className="flex flex-col w-[60%] items-center h-full pt-4">
                    <TaskDisplay headerLabel={'Upcoming Tasks'} filteredTasks={upcomingTasks} />
                </div>
            </div>
        </>
    );
};

export default UpcomingTasks;
