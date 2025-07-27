import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersState } from "./user.reducer";
import { PokemonTeamList, Team } from "@models/pokemon.model";
import { getActiveUser } from "@services/user.service";
import { persistLocalStorageUser } from "@utilities/localStorage";

export const teamsReducer = {
    addTeam: (usersState: UsersState, action: PayloadAction<Team>) => {
        const activeUser = getActiveUser(usersState)

        activeUser?.teams.push(action.payload)
        
        persistLocalStorageUser(usersState)
        
        return usersState
    },
    deleteTeam: (usersState: UsersState, action: PayloadAction<number>) => {
        const activeUser = getActiveUser(usersState)

        if (activeUser?.teams) {
            activeUser.teams = activeUser.teams.filter(team => team.id !== action.payload)
        } 

        persistLocalStorageUser(usersState)
        return usersState
    },
    updateTeam: (usersState: UsersState, action: PayloadAction<{ pokemonList: PokemonTeamList, teamId: number }>) => {
        const activeUser = getActiveUser(usersState)
        const payload = action.payload

        if (activeUser) {
            const foundTeam = activeUser.teams.find(team => team.id === payload.teamId) 
            if (foundTeam) {
                foundTeam.pokemons = action.payload.pokemonList
                foundTeam.count = foundTeam.pokemons.filter(poke => poke !== null).length
            }
        }

        persistLocalStorageUser(usersState)

        return usersState
    },
    updateTeamName: (usersState: UsersState, action: PayloadAction<{ newName: string, teamId: number}>) => {
        const activeUser = getActiveUser(usersState)
        if (activeUser) {
            const foundTeam = activeUser.teams.find(team => team.id === action.payload.teamId)
            if (foundTeam) {
                foundTeam.name = action.payload.newName
            }
        }
        persistLocalStorageUser(usersState)
        return usersState
    }
}