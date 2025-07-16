import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersState } from "./user.reducer";
import { Team } from "@models/pokemon.model";
import { getActiveUser } from "@services/user.service";
import { persistLocalStorageUser } from "@utilities/localStorage";


export const teamsReducer = {
    addTeam: (usersState: UsersState, action: PayloadAction<Team>) => {
        const activeUser = getActiveUser(usersState)

        activeUser?.teams.push(action.payload)
        
        persistLocalStorageUser(usersState)
        
        return usersState
    },
    setTeam: (usersState: UsersState, action: PayloadAction<{ pokemonList: string[], teamId: number }>) => {
        const activeUser = getActiveUser(usersState)
        const payload = action.payload

        if (activeUser) {
            const foundTeam = activeUser.teams.find(team => team.id === payload.teamId) 
            if (foundTeam) {
                foundTeam.pokemons = payload.pokemonList
                foundTeam.count = foundTeam.pokemons.length
            }
        }

        persistLocalStorageUser(usersState)

        return usersState
    }
}