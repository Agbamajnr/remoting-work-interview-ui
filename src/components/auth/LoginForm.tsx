import { nanoid } from "@reduxjs/toolkit"
import { useAppSelector, useAppDispatch } from "core/hooks"
import { selectActiveUser, updateActiveUser, User } from "core/slicers/settingsSlice"

interface LoginFormFields extends HTMLFormControlsCollection {
    email: HTMLInputElement
    name: HTMLInputElement
}
interface LoginFormElements extends HTMLFormElement {
    readonly elements: LoginFormFields
}

export default function LoginForm() {
    const activeUser = useAppSelector(selectActiveUser)
    const storeDispatch = useAppDispatch()


    const handleLoginSubmit = (e: React.FormEvent<LoginFormElements>) => {
        e.preventDefault()

        const { elements } = e.currentTarget
        const email = elements.email.value
        const name = elements.name.value

        const newUser: User = {
            userId: nanoid(),
            email: email,
            name: name,
            dateLoggedIn: new Date()
        }

        e.currentTarget.reset()

        storeDispatch(updateActiveUser(newUser))

    }

    return (
        <>
            {!activeUser && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-[600px]">
                        <h2 className="text-xl font-bold mb-4 dark:text-gray-200">Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input name='email'
                                    type="email"
                                    className="mt-1 block w-full px-3 py-2 border h-[50px] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input minLength={3} name='name'
                                    type="text" autoComplete='full-name'
                                    className="mt-1 block w-full px-3 py-2 h-[50px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-[#3062a3] text-white px-8 py-2 rounded"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}