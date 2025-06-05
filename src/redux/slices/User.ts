import { User } from "@models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorageUser } from "src/utilities/localStorage";

const emptyUserState: User = {
    name: '',
    password: '',
    email: '',
}


const userSlice = createSlice({
    name: 'user',
    initialState: getLocalStorageUser() ? JSON.parse(getLocalStorageUser() as string) : emptyUserState,
    reducers: {
        createUser: (user: User, payload: PayloadAction<User>) => {
            
        }
    }
})