import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import React, { useEffect, useState } from 'react'
import './Pokedex.css'
import  Card  from '@components/PokedexComponent/Card/Card'
import { usePokedexContext } from '@contexts/pokedex.context'
import PaginationButtons from './PaginationButtons/PaginationButtons'
import FilterPokedex from './FilterPokedex/FilterPokedex'

function Pokedex() {
  const {pokemonList} = usePokemonNamesContext()
  const {currentPage, pokedexList, setPokedexList} = usePokedexContext()
  
  const [pageObjs, setPageObjs] = useState<string[] | []>([])

  const itemsPerPage: number = 50 

  useEffect(() => {
    if (!pokedexList.length) setPokedexList(pokemonList)
      const firstPositionIndex = (currentPage -  1) * itemsPerPage
    const lastPositionIndex = firstPositionIndex + itemsPerPage
    
    if (pokedexList) setPageObjs(pokedexList.slice(firstPositionIndex, lastPositionIndex))
  }, [currentPage, pokemonList, pokedexList])  
  
  const lastPage = Math.ceil(pokedexList.length / itemsPerPage)

  if (pokedexList.length > 0) {
    return (
      <>
        <div className='pokedex-container col-md-12 p-3' style={{height: 'auto'}}>
          <FilterPokedex />
            {
              pageObjs.map(obj => {
                return <Card text={obj}/>
              })
            }

        </div>
        <PaginationButtons lastPage={lastPage}/>
      </>
    )
  } else {
    return <div>loading...</div>
  }

}

export default Pokedex