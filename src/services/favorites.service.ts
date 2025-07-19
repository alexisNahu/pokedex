import { UsersState, AppDispatch, addItem, removeItem } from "@redux"

export const addFavorite = (pokemonName: string, dispatch: AppDispatch, usersState: UsersState): boolean | null => {
    if (!usersState.activeUser) return null
    
    const activeUser = usersState.users.find(user => user.id === usersState.activeUser)

    if (!activeUser) return null

    if (activeUser.favorites.includes(pokemonName)) return false

    dispatch(addItem(pokemonName))

    return true
}

export const deleteFavorite = (pokemonName: string, dispatch: AppDispatch, usersState: UsersState): boolean | null => {
    if (!usersState.activeUser) return null
    
    const activeUser = usersState.users.find(user => user.id === usersState.activeUser)

    if (!activeUser) return null

    const foundItem = activeUser.favorites.filter(value => value === pokemonName)

    if (!foundItem) return false

    dispatch(removeItem(pokemonName))

    return true
}