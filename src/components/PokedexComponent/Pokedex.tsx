import React, { useEffect, useMemo, useState } from 'react'

import  Card  from './Card/Card'
import PaginationButtons from './PaginationButtons/PaginationButtons'
import FilterPokedex from './FilterPokedex/FilterPokedex'

import { usePokedexContext, usePokedexPaginationContext } from '@contexts'
import {SuggestionInput} from '@components'
import { UsersState, RootState } from '@redux'
import { PUBLIC } from '@models/routes/routes'
import { getStatic3dSprite, getActiveUser } from '@services'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Pokedex.css'
import { useGetAllNames } from '@hooks/useQueries'

function Pokedex({ list }: { list : 'all' | 'favorites' }) {

  const [pageParams] = useSearchParams()
  const searchParam = pageParams.get('search')

  const usersState: UsersState = useSelector((store: RootState) => store.user)
  const navigator = useNavigate()

  if (!list) return <div>No params sent</div>

  const activeUserFavorites = getActiveUser(usersState)?.favorites

  const {data: pokemonList, isLoading, error} = useGetAllNames()

  const {pokedexList, setPokedexList} = usePokedexContext()
  const {currentPage, setLastPage} = usePokedexPaginationContext()

  const dataFont = useMemo(() => {
    if (list === 'all') return new Set(pokemonList);
    if (list === 'favorites') return new Set(activeUserFavorites);
    return new Set<string>();
  }, [list, pokemonList, activeUserFavorites]);

  const [pageObjs, setPageObjs] = useState<string[] | []>([])

  const itemsPerPage: number = 50 

  useEffect(() => {
    if (searchParam) {
      setPokedexList([...dataFont].filter(data => data.includes(searchParam)))
      return
    }
    setPokedexList([...dataFont]);
  }, [dataFont, searchParam]);

  useEffect(() => {
    const firstIndex = (currentPage - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;

    if (!usersState.activeUser && list !== 'all') {
      navigator(`/${PUBLIC.LOGIN}`)
      return
    }

    setLastPage(Math.ceil(pokedexList.length / itemsPerPage));
    setPageObjs(pokedexList.slice(firstIndex, lastIndex));
  }, [pokedexList, currentPage, setLastPage, usersState]);

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

    if (isLoading || !pokedexList) {
        return <div className='pokedex-container col-md-11 p-3' style={{height: '90%', overflowY: 'auto'}}>
          <div className='d-flex justify-content-center align-items-center'>loading</div></div>
    }


        
    return (
      <>
        <div className='pokedex-container col-md-11 p-3' style={{height: '90%', overflowY: 'auto'}}>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='mx-3'>
              <FilterPokedex dataFont={dataFont} />
            </div>
            <div className='col-md-9'>
              <SuggestionInput 
                completeList={[...dataFont]} 
                handleSuggestionsClick={(name: string) => setPokedexList([...dataFont].filter(pname => pname.includes(name)))} 
                onSubmit={(value: string) => setPokedexList([...dataFont].filter(pname => pname.includes(value)))} 
                handleSuggestionRender={handleSuggestionRender} 
                placeholder='Search for a pokemon here...'
                maxSuggestion={5}
                />
            </div>
          </div>
          <div className='pokemon-card-container'>
            {
              pageObjs.length > 0 ? pageObjs.map((obj, index) => {
                return <Card text={obj} key={index}/>
              }) : <div className='mx-auto'>Nothing yet</div>
            }
          </div>
        </div>
        <PaginationButtons />
      </>
    )


}

export default Pokedex