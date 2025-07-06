import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import React, { useEffect, useState } from 'react'
import './Pokedex.css'
import  Card  from '@components/PokedexComponent/Card/Card'
import { usePokedexContext } from '@contexts/pokedex.context'
import PaginationButtons from './PaginationButtons/PaginationButtons'
import FilterPokedex from './FilterPokedex/FilterPokedex'
import { usePokedexPaginationContext } from '@contexts/pokedexPagination.context'
import SuggestionInput from '@components/layout/AutoSuggestionsInput/SuggestionInput'
import { getStatic3dSprite } from '@services/pokemonSprites.service'

function Pokedex() {
  const {pokemonList} = usePokemonNamesContext()
  const {pokedexList, setPokedexList} = usePokedexContext()
  const {currentPage, setLastPage} = usePokedexPaginationContext()
  
  const [pageObjs, setPageObjs] = useState<string[] | []>([])

  const itemsPerPage: number = 50 

  useEffect(() => {
    if (!pokedexList.length) {
      setPokedexList([...pokemonList])
      return
    }
    const firstPositionIndex = (currentPage -  1) * itemsPerPage
    const lastPositionIndex = firstPositionIndex + itemsPerPage
    setLastPage(Math.ceil(pokedexList.length / itemsPerPage))
    setPageObjs(pokedexList.slice(firstPositionIndex, lastPositionIndex))
  }, [currentPage, pokemonList, pokedexList])  
  

  const handleSuggestionRender = (name: string) => {
    return <div className='d-flex flex-row justify-content-center'>
            <div className="pokemon-sprite-container d-flex flex-row align-items-center">
                <img
                  src={`${getStatic3dSprite(name, false)}`}
                  className="img-fluid"
                  alt="mini-icon"
                  style={{ maxWidth: '48px', maxHeight: '48px' }}
                />              
            </div>
            <span className='d-flex align-items-center'>
                {name}
            </span>
          </div>
    }
  if (pokedexList.length > 0) {
    return (
      <>
        <div className='pokedex-container col-md-11 p-3' style={{height: '90%', overflowY: 'scroll'}}>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='mx-3'>
              <FilterPokedex />
            </div>
            <div className='col-md-9'>
              <SuggestionInput 
                completeList={[...pokemonList]} 
                handleSuggestionsClick={(name: string) => setPokedexList([...pokemonList].filter(pname => pname.includes(name)))} 
                onSubmit={(value: string) => setPokedexList([...pokemonList].filter(pname => pname.includes(value)))} 
                handleSuggestionRender={handleSuggestionRender} 
                placeholder='Search for a pokemon here...'
                maxSuggestion={5}
                />
            </div>
          </div>
          <div className='pokemon-card-container'>
            {
              pageObjs.map((obj, index) => {
                return <Card text={obj} key={index}/>
              })
            }
          </div>
        </div>
        <PaginationButtons />
      </>
    )
  } else {
    return <div>loading...</div>
  }

}

export default Pokedex