import { PayloadAction } from "@reduxjs/toolkit";
import { UsersState } from "./user.reducer";
import { persistLocalStorageUser } from "@utilities/localStorage";

export const favoritesReducers = {
    addItem: (usersState: UsersState, action: PayloadAction<string>) => {
        const user = usersState.users.find(u => u.id === usersState.activeUser);
        
        user?.favorites.push(action.payload);
        
        persistLocalStorageUser(usersState);
        
        return usersState;
    },
    removeItem: (usersState: UsersState, action: PayloadAction<string>) => {
        const user = usersState.users.find(u => u.id === usersState.activeUser);
        
        if (user) {
            user.favorites = user.favorites.filter(fav => fav !== action.payload);
            persistLocalStorageUser(usersState);
        }
        
        return usersState;
    }
}