import TaskDisplay from 'components/task-management/TaskDisplay';
import { useAppSelector } from 'core/hooks';
import { selectAllTasks, TaskCategory } from 'core/slicers/tasksSlice';
import { format, toDate } from 'date-fns';
import React from 'react';

const CategoryTasks: React.FC<{ category: TaskCategory }> = ({ category }) => {
    // State to hold the list of tasks
    const allTasks = useAppSelector(selectAllTasks);

    let taskToUse = allTasks.filter(task => {
        return (toDate(format(task.deadline, 'MM/dd/yyyy')) >= toDate(format(new Date(), 'MM/dd/yyyy')) && !task.completed);
    })

    switch (category.name.toLowerCase()) {
        case 'personal':
        case 'work':
            taskToUse = allTasks.filter(task => {
                return task.category.name == category.name;
            })
            break;
        case 'completed':
            taskToUse = allTasks.filter(task => {
                return task.completed == true;
            })
            break;

        default:
            break;
    }

    return (
        <>
            <div className='flex flex-col w-full items-center h-full'>
                <div className="flex flex-col w-[60%] items-center h-full pt-4">
                    <TaskDisplay headerLabel={`${category.name} Tasks`} filteredTasks={taskToUse} />
                </div>
            </div>
        </>
    );
};

export default CategoryTasks;
