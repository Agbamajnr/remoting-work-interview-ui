import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'core/store'

// Define a TS type for the data we'll be using
export interface User {
    userId: string
    email: string
    username: string
    dateLoggedIn: string
}

export interface Setting {
    isDarkMode: boolean
    activeUser: User | null
}

export const isDefaultDarkMode = localStorage.getItem("persist:root")
    ? (JSON.parse((JSON.parse(localStorage.getItem("persist:root")!).settings)) as Setting).isDarkMode : window.matchMedia('(prefers-color-scheme: dark)').matches

export const initialState: Setting = {
    isDarkMode: isDefaultDarkMode,
    activeUser: null
};

console.log(isDefaultDarkMode)
if (initialState.isDarkMode) {
    document.body.classList.add('dark')
}

// Create the slice and pass in the initial state
const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateAppTheme(state, action: PayloadAction<'light' | 'dark'>) {
            if (action.payload == 'dark') {
                state.isDarkMode = true
                document.body.classList.add('dark')
            } else {
                state.isDarkMode = false
                document.body.classList.remove('dark')
            }
        },

        updateActiveUser(state, action: PayloadAction<User>) {
            state.activeUser = action.payload
        },

        activeUserLoggedOut(state) {
            state.activeUser = null
        }
    }
})

export const { updateActiveUser, updateAppTheme, activeUserLoggedOut } = settingsSlice.actions

export const selectActiveUser = (state: RootState) => state.settings.activeUser
export const selectAppTheme = (state: RootState) => state.settings.isDarkMode


// Export the generated reducer function
export default settingsSlice.reducer