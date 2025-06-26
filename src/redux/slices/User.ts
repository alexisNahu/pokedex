import { Rol, User } from "@models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorageUser, setLocalStorageUser, clearLocalStorage } from "@utilities/localStorage";

const emptyUserState: User = {
    name: 'alexis',
    password: '1',
    email: '1',
    rol: Rol.USER
}

export const userSlice = createSlice({
    name: 'user',
    initialState: getLocalStorageUser() ? JSON.parse(getLocalStorageUser() as string) : emptyUserState,
    reducers: {
        createUser: (userState: User, action: PayloadAction<User>) => {
            setLocalStorageUser(action.payload)
            console.log(JSON.parse(localStorage.getItem('user') as string))
            return action.payload
        },
        updateUser: (userState: User, action: PayloadAction<User>) => {
            setLocalStorageUser({...userState, ...action.payload})
            return {...userState, ...action.payload}
        },
        removeUser: () => {
            clearLocalStorage()
            return emptyUserState
        }
    }   
})

export const {createUser, updateUser, removeUser} = userSlice.actions
export default userSlice.reducer
