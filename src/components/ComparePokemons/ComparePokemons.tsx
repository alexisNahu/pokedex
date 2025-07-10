import React, { useEffect, useRef, useState } from 'react'
import './ComparePokemons.css'
import SuggestionInput from '@components/layout/AutoSuggestionsInput/SuggestionInput'
import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import { getStatic3dSprite } from '@services/pokemonSprites.service'
import { ModelData, PokemonDTO } from '@models/pokemon.model'
import { getPokemonDTOByNameOrId } from '@services/index'
import PokeTypes from '@components/PokeTypesComponent/PokeTypes'
import PokemonImage from '@components/PokemonImage/PokemonImage'
import { Modal } from '@components/Modal/CustomModal'
import { Ability } from '@models/dao'
import { useModalContext } from '@components/Modal/context/UseModalContext'
import { Button } from 'react-bootstrap'
import Cards from './Cards/Cards'

function ComparingPage() {
  const {pokemonList} = usePokemonNamesContext()
  const {setState} = useModalContext()

  const [comparingList, setComparingList] = useState<Map<string, PokemonDTO | null>>(new Map([]))

  const [showingAbility, setShowingAbility] = useState<{
          name: string,
          pokedex_description: string,
          in_game_effect: string,
      }>()

  const controllerRef = useRef<AbortController>(new AbortController())

  useEffect(() => {
    console.log(comparingList)
    return () => controllerRef.current.abort()
  }, [comparingList])

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

  const getPokemonDTO = async (name: string) => {
    controllerRef.current.abort()
    controllerRef.current = new AbortController()
    return await getPokemonDTOByNameOrId(name, controllerRef.current.signal)
  }

  const onSubmitFn = async (value: string) => {
    console.log('sssaa')
    if (pokemonList.has(value)) {
      const newPokemon = await getPokemonDTO(value)
      if (newPokemon) setComparingList(new Map([...comparingList, [value as string, newPokemon] ]))
    }
  }

  const handleSuggestionClick = (name: string) => {
    console.log('submitting value: ',name)
    onSubmitFn(name)
  }

  const handleAbilityClick= (entry: {
            name: string,
            pokedex_description: string,
            in_game_effect: string,
        }) => {
        setState(true)
        setShowingAbility(entry)
    }

  const deleteAndUpdateListState = (name: string) => {
    setComparingList((prev) => {
      const newMap = new Map(prev)
      newMap.delete(name)
      return newMap
    })
  }

  return (
    <div className='comparing-page-container col-md-11 p-3' style={{height: '800px'}}>
      <div className='col-md-4 mx-auto position-sticky top-0 z-3 bg-poke-blue'>
        <SuggestionInput 
          completeList={[...pokemonList]} 
          handleSuggestionsClick={handleSuggestionClick}
          handleSuggestionRender={handleSuggestionRender}
          onSubmit={onSubmitFn} 
          maxSuggestion={6} 
          placeholder='Search for a pokemon here ....'
          clearWhenSubmitted
          />
      </div>
      <div>
        <Cards 
          data={[...comparingList.values()].filter((v): v is PokemonDTO => v !== null)} 
          columns={[
            { column: '', data: (p: PokemonDTO) => <PokemonImage isShiny={false} poke={p} imgWidth={100} />},
            { column: 'Types', data: (p: PokemonDTO) => <PokeTypes pokemonTypes={p.types} /> },
            { column: 'HP', data: (p: PokemonDTO) => p.stats.find(v => v.stat === 'hp')?.value ?? ''},
            { column: 'Attack', data: (p: PokemonDTO) => p.stats.find(v => v.stat === 'attack')?.value },
            { column: 'Defense', data: (p: PokemonDTO) => p.stats.find(v => v.stat === 'defense')?.value },
            { column: 'Sp. Attack', data: (p: PokemonDTO) => p.stats.find(v => v.stat === 'special-attack')?.value },
            { column: 'Sp. Defense', data: (p: PokemonDTO) => p.stats.find(v => v.stat === 'special-defense')?.value },
            { column: 'Speed', data: (p: PokemonDTO) => p.stats.find(v => v.stat === 'speed')?.value },
            { column: 'Abilities', data: (p :PokemonDTO) => p.abilities.map(a => a.en.map(v => <button onClick={() => handleAbilityClick(v)}>{v.name}</button>))},
            { column: '', data: (p: PokemonDTO) => <i className="bi bi-x-square fs-1" onClick={() => deleteAndUpdateListState(p.name)}></i>},
          ]}
        />
        
          
      </div>
      <Modal>
        <div>
            {showingAbility?.name.toUpperCase()}
            <p>{showingAbility?.in_game_effect}</p>
            <p>{showingAbility?.pokedex_description}</p>
          </div>
      </Modal>
    </div>
    
  )
}

export default ComparingPage