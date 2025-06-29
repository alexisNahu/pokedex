import { Rol, User } from "@models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearLocalStorage, persistLocalStorageUser } from "@utilities/localStorage";

export const emptyUserState: User = {
    name: 'alexis',
    password: '123456789',
    email: 'alexisnahuelidoyaga@gmail.com',
    rol: Rol.USER
}

export const initialState: {users: User[], activeUser: User | null} = {
    users: [emptyUserState],
    activeUser: null
}

export interface UsersState {
    users: User[],
    activeUser: User | null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : initialState,    
    reducers: {
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
            const updatedUsersState = {users: [...userState.users, action.payload], activeUser: userState.activeUser}
            persistLocalStorageUser(updatedUsersState)
            return updatedUsersState
        },
        logoutUser: (userState: UsersState) => {
            const updatedUsersState = {users: [...userState.users], activeUser: null}
            persistLocalStorageUser(updatedUsersState)
            return updatedUsersState
        }
    }   
})

export const {removeUser, loginUser, registerUser, logoutUser} = userSlice.actions
export default userSlice.reducer
