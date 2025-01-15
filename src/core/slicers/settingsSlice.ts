import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'core/store'

export interface User {
    userId: string
    email: string
    name: string
    dateLoggedIn: Date
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

if (initialState.isDarkMode) {
    document.body.classList.add('dark')
}

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

        userIdUpdated(state, action: PayloadAction<string>) {
            if (state.activeUser) state.activeUser.userId = action.payload
        },

        activeUserLoggedOut(state) {
            state.activeUser = null
        }
    }
})

export const { updateActiveUser, updateAppTheme, activeUserLoggedOut, userIdUpdated } = settingsSlice.actions

export const selectActiveUser = (state: RootState) => state.settings.activeUser
export const selectAppTheme = (state: RootState) => state.settings.isDarkMode


// Export the generated reducer function
export default settingsSlice.reducer