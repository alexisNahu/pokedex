import { PokemonTeamList, Team } from "@models/pokemon.model"
import { UsersState } from "@redux/slices/user/reducers/user.reducer"
import { updateTeam, updateTeamName, userSlice } from "@redux/slices/user/User"
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
