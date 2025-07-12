import { useDispatch, useSelector } from "react-redux";
import { UsersState } from "../redux/slices/user/reducers/user.reducer"
import { AppDispatch, RootState } from "src/redux/store";
import { addItem, removeItem } from "../redux/slices/user/User";

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