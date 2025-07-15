import { PokemonDTO, VariantPokemonDTO } from '@models/pokemon.model'
import React from 'react'

interface Props {
    poke: PokemonDTO | VariantPokemonDTO
    handleClick: (entry: {
        name: string;
        pokedex_description: string;
        in_game_effect: string;
    }) => void 
    minimizedVersion?: boolean
}

function PokemonAbilities({poke, handleClick, minimizedVersion}: Props) {

  return (
     <span className='d-flex flex-column mb-3'>
        {minimizedVersion ?? <h5 className='mb-0'>Abilities:</h5>} <p className={`mb-0 ${minimizedVersion ? 'd-flex flex-column' : ''}`}>
            {poke.abilities.map(((ability, i) => (
                <span key={i}>
                    {ability.en?.map((entry, a) => (
                        <button
                            key={a}
                            className='btn btn-outline-light m-1'
                            onClick={() => handleClick(entry)}
                        >
                            {entry.name}
                        </button>
                    ))}
                </span>
            )))}
        </p></span>
  )
}

export default PokemonAbilities