import { Rol, User } from "@models/user.model"
import { PayloadAction } from "@reduxjs/toolkit"
import { clearLocalStorage, persistLocalStorageUser } from "@utilities/localStorage"
import { initialState } from "../User"

export interface UsersState {
    users: User[],
    activeUser: User | null,
}


export const userReducers = {
    removeUser: () => {
        clearLocalStorage()
        return initialState
    },
    loginUser: (userState: UsersState, action: PayloadAction<User>) => {
        const updatedUsersState = {users: userState.users, activeUser: action.payload} 
        persistLocalStorageUser(updatedUsersState)
        return updatedUsersState
    },
    registerUser: (userState: UsersState, action: PayloadAction<User>) => {
        const user = action.payload
        const updatedUsersState = {users: [...userState.users, user], activeUser: user}
        persistLocalStorageUser(updatedUsersState)
        return updatedUsersState
    },
    logoutUser: (userState: UsersState) => {
        const updatedUsersState = {users: [...userState.users], activeUser: null}
        persistLocalStorageUser(updatedUsersState)
        return updatedUsersState
    },
} 