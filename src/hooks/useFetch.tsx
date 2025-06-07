import React, { useEffect, useState } from 'react'
import * as pokemonService from '@services/pokemon.service'
import { PokemonDTO } from '@models/pokemon.model'

interface Props {
    nameOrId: string
}

type ErrorType = null | Error

interface Response {
    loading: boolean,
    pokemon?: PokemonDTO | null,
    errors?: ErrorType
}

function useFetch({nameOrId}:Props) {
    const [pokemon, setpokemon] = useState<PokemonDTO | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [errors, setErrors] = useState<ErrorType>(null)

    useEffect(() => {
        const getPokemon = async () => {
            try {
                const pokemon = await pokemonService.getPokemonDTOByNameOrId(nameOrId)

                setpokemon(pokemon)
                console.log(pokemon)
            } catch (error) {
                if (error instanceof Error) {
                    setErrors(error)
                } else {
                    setErrors(new Error('Unknown error occurred'))
                }
            } finally {
                setLoading(false)
            }
        }

        getPokemon()
    }, [nameOrId])

    let response: Response = {
        loading, pokemon, errors
    }
    return response
}

export default useFetch