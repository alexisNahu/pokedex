import React, { useEffect, useState } from 'react'
import { PokemonDTO } from '@models'
import { getPokemonDTOByNameOrId } from '@services'

interface Props {
  nameOrId: string
}

type ErrorType = null | Error

interface Response {
  loading: boolean
  pokemon?: PokemonDTO | null
  errors?: ErrorType
}

function useFetch({ nameOrId }: Props): Response {
  const [pokemon, setPokemon] = useState<PokemonDTO | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [errors, setErrors] = useState<ErrorType>(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const getPokemon = async () => {
      setLoading(true)
      setErrors(null)

      try {
        const pokemon = await getPokemonDTOByNameOrId(nameOrId, signal)
        setPokemon(pokemon)
      } catch (error) {
        if (error === 'Aborted') {
          // No hacer nada si fue cancelado
          return
        }

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

    // cleanup: cancela la solicitud si nameOrId cambia o se desmonta
  }, [nameOrId])

  return { loading, pokemon, errors }
}

export default useFetch
