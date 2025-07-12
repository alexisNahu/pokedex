import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { UsersState } from '../../redux/slices/user/reducers/user.reducer'
import * as ROUTES from "@models/routes/routes";
import * as favoritesService from '@services/favorites.service'
import { useNavigate } from 'react-router-dom'
import * as userService from '@services/user.service'

function SavePokemons({pokemonName}: {pokemonName: string}) {
    const dispatch = useDispatch<AppDispatch>();
    const usersState: UsersState = useSelector((store: RootState) => store.user)
    const navigator = useNavigate()

    const loggedUser = userService.getActiveUser(usersState)

    const [isPokemonSaved, setIsPokemonSaved] = useState<boolean>(loggedUser?.favorites.includes(pokemonName) ? true : false)
    
    const handleClick = () => {
        if (isPokemonSaved) {
            const isDeleted = favoritesService.deleteFavorite(pokemonName, dispatch, usersState)
            if (isDeleted) setIsPokemonSaved(false)
        } else if (!isPokemonSaved) {
            const isSaved = favoritesService.addFavorite(pokemonName, dispatch, usersState)
            if (isSaved) setIsPokemonSaved(true)
            if (isSaved === null) navigator(`/${ROUTES.PUBLIC.LOGIN}`)
        }
    }

    return <i className={`bi bi-bookmarks${isPokemonSaved ? '-fill' : ''} fs-1`} onClick={() => handleClick()}></i>
}

export default SavePokemons