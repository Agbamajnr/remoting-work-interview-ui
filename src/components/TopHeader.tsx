import { useAppSelector } from "core/hooks";
import { selectAllTasks } from "core/slicers/tasksSlice";
import { calculateNumberPercentage } from "utils";

export default function TopHeader() {
    const allTasks = useAppSelector(selectAllTasks)

    function calculateTaskProgress(): number {
        if (allTasks.length == 0) {
            return 0;
        } else {
            const completedTasks = allTasks.filter((task) => {
                return task.completed === true;
            })

            return calculateNumberPercentage(completedTasks.length, allTasks.length);
        }
    }
    return (
        <header className='h-[40px] border-b flex flex-row items-center justify-end'>
            {/* progress bar */}
            <div className="flex flex-row items-center gap-x-1 px-[20px] transition-all">
                <span className="text-lg text-gray-500 font-medium">Progress:</span>
                <div className="rounded h-[20px] w-[150px] bg-gray-200">
                    <div style={{
                        width: calculateTaskProgress() > 0 ? `${Math.ceil(calculateTaskProgress())}%` : 0
                    }} className={`h-full rounded bg-green-600`}></div>
                </div>
                <span className="text-lg font-medium">{Math.ceil(calculateTaskProgress())}%</span>
            </div>
        </header>
    );
};