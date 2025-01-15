import { Task } from "core/slicers/tasksSlice";
import { format, toDate } from "date-fns";
import { Calendar, CircleCheckBig, GripVertical } from "lucide-react";
import { CSSProperties, useState } from "react";
import VirtualList from 'react-virtual-drag-list';

export default function TaskDisplay({ headerLabel, filteredTasks }: { headerLabel: string, filteredTasks: Task[] }) {

    const overdueTasks = filteredTasks.filter(task => {
        return (toDate(format(task.deadline, 'MM/dd/yyyy')) < toDate(format(new Date(), 'MM/dd/yyyy')) && !task.completed);
    })
    const upcomingTasks = filteredTasks.filter(task => {
        return toDate(format(task.deadline, 'MM/dd/yyyy')) >= toDate(format(new Date(), 'MM/dd/yyyy'));
    })


    const [upcomingTasksList, setUpcomingList] = useState<Task[]>(upcomingTasks);

    const onTaskDrop = (event: any) => {
        setUpcomingList(event.list);
    }

    return (
        <div className="flex w-full flex-col items-start justify-start">
            <h1 className="text-3xl font-semibold text-gray-950">{headerLabel}</h1>
            <div className="flex flex-row items-center mt-1.5 gap-x-1">
                <CircleCheckBig size={14} color="#d1d5db" />
                <p className="text-sm text-gray-300">{filteredTasks.length} tasks</p>
            </div>


            {/* list */}

            {/* overdue list */}
            {
                overdueTasks.length > 0
                    ? <div className="flex flex-col items-center w-full mt-4 gap-y-2">
                        <div className="border-b py-1 flex flex-row items-center w-full">
                            <h3 className="text-sm font-semibold text-black">Overdue</h3>
                        </div>
                    </div>
                    : null
            }

            {/* upcoming list */}
            {
                upcomingTasks.length > 0
                    ? <div className="flex flex-col items-center w-full mt-6 gap-y-2">
                        <div className="px-5 w-full">
                            <div className="border-b py-1 flex flex-row items-center w-full">
                                <h3 className="text-sm font-semibold text-black">Upcoming</h3>
                            </div>
                        </div>

                        <TasksList listSource={upcomingTasksList} onDrop={onTaskDrop} />
                    </div>
                    : null
            }


        </div>
    )
}


function TasksList({ listSource, onDrop }: { listSource: Task[], onDrop: (event: any) => void }) {
    return (
        <VirtualList
            className="virtual-list w-full"
            style={{ overflow: 'hidden' } as CSSStyleDeclaration}
            dataKey="id"
            dataSource={listSource}
            handle=".handle"
            direction="vertical"
            onDrop={onDrop}
        >
            {
                (record, index, dataKey) => {
                    return (
                        <div className="flex flex-row items-start w-full h-fit gap-x-2 py-3">
                            <GripVertical size={20} className="handle cursor-grabbing" />
                            <div className=" border-b w-full flex flex-row justify-between items-start h-full">
                                <div className="details flex flex-col items-start gap-y-1 pb-1">
                                    <h2 className="text-sm font-medium">{record.taskName}</h2>
                                    {
                                        record.taskDescription.length > 0
                                            ? <h4 className="text-xs text-gray-400 font-medium">{record.taskDescription}</h4>
                                            : null
                                    }

                                    <div className="border rounded-lg py-1.5 px-3 gap-x-1 flex flex-row items-center mt-2">
                                        <Calendar size={15} />

                                        <span className="text-sm font-medium">{format(record.deadline, 'MMM dd')}</span>
                                    </div>

                                </div>

                                <div className="option flex flex-row"></div>
                            </div>
                        </div>
                    )
                }
            }
        </VirtualList>
    )
}
