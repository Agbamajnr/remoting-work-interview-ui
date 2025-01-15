import TaskDisplay from 'components/task-management/TaskDisplay';
import { useAppDispatch, useAppSelector } from 'core/hooks';
import { selectAllTasks } from 'core/slicers/tasksSlice';
import React, { useState } from 'react';

const Tasks: React.FC = () => {
    // State to hold the list of tasks
    const allTasks = useAppSelector(selectAllTasks)

    return (
        <>
            <div className='flex flex-col w-full items-center h-full'>
                <div className="flex flex-col w-[60%] items-center h-full pt-4">
                    <TaskDisplay headerLabel={'Tasks'} filteredTasks={allTasks} />
                </div>
            </div>
        </>
    );
};

export default Tasks;
