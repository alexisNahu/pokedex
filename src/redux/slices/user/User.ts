import { Rol, User } from "@models/user.model";
import { createSlice } from "@reduxjs/toolkit";
import { authReducers } from "./reducers/user.reducer";
import { favoritesReducers } from "./reducers/favorites.reducer";
import { teamsReducer } from "./reducers/teams.reducer";
export const emptyUserState: User = {
    id: 1,
    username: 'alexis',
    password: '123456789',
    email: 'alexisnahuelidoyaga@gmail.com',
    rol: Rol.USER,
    favorites: [],
    teams: [{
        id: 1,
        name: "main",
        count: 2,
        pokemons: ['charizard','greninja',null,null,null,null]
    },{
        id: 2,
        name: 'saeloo',
        count: 2,
        pokemons: ['squirtle','eevee', null, null, null,null]
    },{
        id: 3,
        name: 'saeloo',
        count: 2,
        pokemons: ['squirtle','eevee', null, null, null,null]
    }]
}

export const initialState: {users: User[], activeUser: number | null} = {
    users: [emptyUserState],
    activeUser: emptyUserState.id
} //dejo que este logeado por defecto para evitar la molestia de logearse cada que elimino las cookies


export const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : initialState,    
    reducers: {
        ...authReducers,
        ...favoritesReducers,
        ...teamsReducer,
    }   
})

export const {removeUser, loginUser, registerUser, logoutUser, addItem, removeItem, addTeam, updateTeam, updateTeamName, deleteTeam} = userSlice.actions
export default userSlice.reducer
