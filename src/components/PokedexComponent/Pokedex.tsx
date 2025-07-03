import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import React, { useEffect, useState } from 'react'
import './Pokedex.css'
import  Card  from '@components/PokedexComponent/Card/Card'
import { usePokedexContext } from '@contexts/pokedex.context'
import PaginationButtons from './PaginationButtons/PaginationButtons'
import FilterPokedex from './FilterPokedex/FilterPokedex'
import { usePokedexPaginationContext } from '@contexts/pokedexPagination.context'
import TypesFilter from './FilterPokedex/TypesFilter/TypesFilter'

function Pokedex() {
  const {pokemonList} = usePokemonNamesContext()
  const {pokedexList, setPokedexList} = usePokedexContext()
  const {currentPage, setLastPage} = usePokedexPaginationContext()
  
  const [pageObjs, setPageObjs] = useState<string[] | []>([])

  const itemsPerPage: number = 50 

  useEffect(() => {
    if (![...pokedexList].length) {
      setPokedexList([...pokemonList])
      return
    }
    const firstPositionIndex = (currentPage -  1) * itemsPerPage
    const lastPositionIndex = firstPositionIndex + itemsPerPage
    setLastPage(Math.ceil([...pokedexList].length / itemsPerPage))
    
    if (pokedexList) setPageObjs([...pokedexList].slice(firstPositionIndex, lastPositionIndex))
  }, [currentPage, pokemonList, pokedexList])  
  

  if ([...pokedexList].length > 0) {
    return (
      <>
        <div className='pokedex-container col-md-12 p-3' style={{height: '90%', overflowY: 'scroll'}}>
          <div className="col">
            <FilterPokedex />
          </div>
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