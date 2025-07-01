import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import React, { useEffect, useState } from 'react'
import './Pokedex.css'
import  Card  from '@components/PokedexComponent/Card/Card'
import { usePokedexContext } from '@contexts/pokedex.context'
import PaginationButtons from './PaginationButtons/PaginationButtons'
import FilterPokedex from './FilterPokedex/FilterPokedex'
import { usePokedexPaginationContext } from '@contexts/pokedexPagination.context'

function Pokedex() {
  const {pokemonList} = usePokemonNamesContext()
  const {pokedexList, setPokedexList} = usePokedexContext()
  const {currentPage, lastPage, setLastPage} = usePokedexPaginationContext()
  
  const [pageObjs, setPageObjs] = useState<string[] | []>([])

  const itemsPerPage: number = 50 

  useEffect(() => {
    if (!pokedexList.length) setPokedexList(pokemonList)
    const firstPositionIndex = (currentPage -  1) * itemsPerPage
    const lastPositionIndex = firstPositionIndex + itemsPerPage
    setLastPage(Math.ceil(pokedexList.length / itemsPerPage))
    
    if (pokedexList) setPageObjs(pokedexList.slice(firstPositionIndex, lastPositionIndex))
    console.log('lastpage',lastPage)
  }, [currentPage, pokemonList, pokedexList])  
  

  if (pokedexList.length > 0) {
    return (
      <>
        <div className='pokedex-container col-md-12 p-3' style={{height: '90%'}}>
          <FilterPokedex />
            {
              pageObjs.map((obj, index) => {
                return <Card text={obj} key={index}/>
              })
            }
        </div>
        <PaginationButtons />
      </>
    )
  } else {
    return <div>loading...</div>
  }

}

export default Pokedex