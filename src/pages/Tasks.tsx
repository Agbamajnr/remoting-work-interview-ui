import React, { useState } from 'react';

// Define a type for the task
type Task = {
    id: number;
    title: string;
    completed: boolean;
};

const Tasks: React.FC = () => {
    // State to hold the list of tasks
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
    ]);

    // Function to toggle the completion status of a task
    const toggleTaskCompletion = (taskId: number) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.title}
                        </span>
                        <button onClick={() => toggleTaskCompletion(task.id)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
