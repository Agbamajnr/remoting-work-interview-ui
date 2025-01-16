import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'core/store'

import UpcomingIcon from '/src/assets/icons/sidebar-upcoming-icon.png'
import WorkIcon from '/src/assets/icons/sidebar-work-icon.png'
import PersonalIcon from '/src/assets/icons/sidebar-personal-icon.png'
import CompletedIcon from '/src/assets/icons/sidebar-completed-icon.png'


export interface Task {
    userId: string
    id: string
    taskName: string
    taskDescription: string
    category: TaskCategory
    keywords: string[]
    deadline: Date
    completed: boolean
    createdAt: Date
}

export interface TaskCategory {
    name: string
    description: string,
    icon: string
}
export const defaultTaskCategories: TaskCategory[] = [
    {
        name: "Work",
        description: 'Task for Work',
        icon: WorkIcon
    },

    {
        name: "Personal",
        description: 'Task for Personal Life',
        icon: PersonalIcon
    },

]

export const defaultFilterCategories: TaskCategory[] = [
    {
        name: "Upcoming",
        description: 'Upcoming Task',
        icon: UpcomingIcon
    },
    {
        name: "Completed",
        description: 'Completed Task',
        icon: CompletedIcon
    },
]

export const initialState: Task[] = []

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskAdded(state, action: PayloadAction<Task>) {
            state.push(action.payload)
        },
        taskDeleted(state, action: PayloadAction<{ taskId: string }>) {
            const existingTask = state.find(task => task.id === action.payload.taskId)
            if (existingTask) {
                state.splice(state.indexOf(existingTask), 1)
            }
        },

        taskUpdated(state, action: PayloadAction<Task>) {
            const { id, taskName, taskDescription, category, keywords, deadline } = action.payload
            const existingTask = state.find(task => task.id === id)
            if (existingTask) {
                existingTask.taskName = taskName
                existingTask.taskDescription = taskDescription
            }
        },

        taskCompletionUpdate(state, action: PayloadAction<{ taskId: string, status: boolean }>) {
            const existingTask = state.find(task => task.id === action.payload.taskId)
            if (existingTask) existingTask.completed = action.payload.status
        },

        taskIdUpdated(state, action: PayloadAction<{ localId: string, serverId: string }>) {
            const existingTask = state.find(task => task.id === action.payload.localId)
            if (existingTask) existingTask.id = action.payload.serverId
        }
    }
})

export const { taskAdded, taskCompletionUpdate, taskIdUpdated, taskUpdated, taskDeleted } = tasksSlice.actions

export const selectAllTasks = (state: RootState) => state.tasks
export const selectTaskById = (state: RootState, id: string) => state.tasks.find(task => task.id === id)


// Export the generated reducer function
export default tasksSlice.reducer