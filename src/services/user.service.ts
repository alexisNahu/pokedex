import { Team } from "@models/pokemon.model"
import { User } from "@models/user.model"
import { UsersState } from "@redux/slices/user/reducers/user.reducer"
import { setTeam } from "@redux/slices/user/User"
import { AppDispatch } from "@redux/store"
import { useDispatch } from "react-redux"

export const getActiveUser = (usersState: UsersState) => {
    return usersState.users.find(user => user.id === usersState.activeUser)
} 

export const getActiveUserTeam = (usersState: UsersState, id: string): Team | null => {
    const numberId = Number(id)
    const activeUser = getActiveUser(usersState)
    if (!numberId || !activeUser) return null
    return activeUser.teams.find(team => team.id === numberId) || null
}

export const getActiveUserTeams = (usersState: UsersState): Team[] | null => {
    const activeUser = getActiveUser(usersState)
    if (!activeUser) return null
    return activeUser.teams || null
}

export const updateActiveUserTeam = (usersState: UsersState, team: string[], id: string, dispatch: AppDispatch) => {
    const numberId = Number(id)
    const activeUser = getActiveUser(usersState)
    if (!numberId || !activeUser) return null
    dispatch(setTeam({teamId: numberId, pokemonList: team})) 
}