import { PayloadAction } from "@reduxjs/toolkit";
import { UsersState } from "./user.reducer";
import { persistLocalStorageUser } from "@utilities/localStorage";


export const favoritesReducers = {
    addItem: (userState: UsersState, action: PayloadAction<string>) => {
        userState.activeUser?.favorites.push(action.payload)
        persistLocalStorageUser(userState)
        return userState

    },
    removeItem: (userState: UsersState, action: PayloadAction<string>) => {
        if (userState.activeUser) userState.activeUser.favorites = userState.activeUser?.favorites.filter(
            value => value !== action.payload
        )
        persistLocalStorageUser(userState)
        return userState
    }
}