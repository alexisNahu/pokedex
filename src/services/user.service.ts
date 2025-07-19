import { PokemonTeamList, Team } from "@models/pokemon.model"
import { UsersState } from "@redux/slices/user/reducers/user.reducer"
import { addTeam, deleteTeam, updateTeam, updateTeamName, userSlice } from "@redux/slices/user/User"
import { AppDispatch } from "@redux/store"

export const getActiveUser = (usersState: UsersState) => {
    return usersState.users.find(user => user.id === usersState.activeUser)
} 

export const getActiveUserTeam = (usersState: UsersState, id: string): Team | null => {
    const numberId = Number(id)
    const activeUser = getActiveUser(usersState)
    if (!numberId || !activeUser) return null
    return activeUser.teams.find(team => team.id === numberId) || null
}

export const changeTeamName = (usersState: UsersState, teamId: string, newName: string, dispatch: AppDispatch) => {
    const activeUser = getActiveUser(usersState)
    const numberId = Number(teamId)
    if (!activeUser || isNaN(numberId)) return null
    dispatch(updateTeamName({newName: newName, teamId: numberId}))

}

export const createUserTeam = (usersState: UsersState, dispatch: AppDispatch) => {
    const activeUser = getActiveUser(usersState)
    const teams = getActiveUserTeams(usersState)
    if (!activeUser) return null
    const newTeam: Team = {
        id: teams ? teams.filter(poke => poke !== null).length + 1 : 1,
        name: "New team",
        count: 0,
        pokemons: [null, null, null, null, null, null]
    }
    dispatch(addTeam(newTeam))
} 

export const removeUserTeam = (usersState: UsersState, dispatch: AppDispatch, teamId: string) => {
    const numberId = Number(teamId)
    const activeUser = getActiveUser(usersState)
    const teams = getActiveUserTeams(usersState)

    if (!activeUser || isNaN(numberId)) return null

    if (teams?.length && teams.length > 0) {
        dispatch(deleteTeam(numberId))
    }
}

export const getActiveUserTeams = (usersState: UsersState): Team[] | null => {
    const activeUser = getActiveUser(usersState)
    if (!activeUser) return null
    return activeUser.teams || null
}

export const updateActiveUserTeam = (usersState: UsersState, team: PokemonTeamList, id: string, dispatch: AppDispatch) => {
    const numberId = Number(id)
    const activeUser = getActiveUser(usersState)
    if (isNaN(numberId) || !activeUser) return null
    const filledTeam = [...team, ...Array(6 - team.length).fill(null)].slice(0,6) as PokemonTeamList
    if (filledTeam.length === 6) {
        console.log(filledTeam)
        dispatch(updateTeam({teamId: numberId, pokemonList: filledTeam})) 
        return true
    }
    return null
}
