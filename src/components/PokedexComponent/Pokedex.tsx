import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import React, { useEffect, useState } from 'react'

function Pokedex() {
  const {pokemonList, setPokemonList} = usePokemonNamesContext()
  if (pokemonList.length > 0) {
    return (
      <div>
        {pokemonList}
      </div>
    )
  } else {
    return <div>loading...</div>
  }

}

export default Pokedex