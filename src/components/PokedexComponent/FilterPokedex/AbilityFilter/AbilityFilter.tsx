import { getAllPokemonAbilities } from '@services/pokeapi.service'
import React, { useEffect, useState } from 'react'
import { mapToPokemonNamesDAO } from '@utilities/mappers/mapToPokemonNames'
import { usePokedexContext } from '@contexts/pokedex.context'
import { PokedexFilters } from '@models/pokemon.model'
import SuggestionInput from '@components/layout/AutoSuggestionsInput/SuggestionInput'

function AbilityFilter() {
  const {filters, setFilters} = usePokedexContext()

  const [allAbilities, setAllAbilities] = useState<Set<string>>(new Set([])) 
  const [selectedAbilities, setSelectedAbilities] = useState<Set<string>>(new Set())

  useEffect(() => {
    const updatedFilter: PokedexFilters = {...filters, abilitiesFilter: [...selectedAbilities] }
    setFilters(updatedFilter)  
  }, [selectedAbilities])

  useEffect(() => {
    if (!allAbilities.size) loadAbilities()
  }, [allAbilities])

  const loadAbilities = async () => {
    try {
      const response = await getAllPokemonAbilities()
      const abilitiesNames = mapToPokemonNamesDAO(response.results)
      setAllAbilities(new Set<string>(abilitiesNames))
    } catch (e) {
      console.error(`Error while fetching abilities: ${e}`)
    }
  }


  return (
    <div className='d-flex'>
      <div className="mb-3 mx-3 w-25 d-flex flex-column">
        <label htmlFor="abilities" className="form-label fw-bold">
          Abilities
        </label>
        <SuggestionInput 
          completeList={[...allAbilities]}
          handleSuggestionsClick={(name: string) => setSelectedAbilities(new Set(selectedAbilities).add(name))}
          handleSuggestionRender={(name: string) => {
            return <div>{name}</div>
          }}
          maxSuggestion={5}
        />
      </div>
       <div>
        <h6 className="mb-2 mx-2">Selected Abilities: </h6>
        <div className="d-flex flex-wrap gap-2">
          {[...selectedAbilities].map((ab) => (
           <div style={{ width: 'fit-content', padding: '10px' }}>
            <span className="rounded bg-primary text-white fs-5 d-flex align-items-center gap-2 px-3 py-2">
              <p className="mb-0">{ab}</p>
              <i className="bi bi-x-circle fs-6 text-red" style={{ cursor: 'pointer' }} onClick={() => setSelectedAbilities(new Set([...selectedAbilities].filter(abi => abi !== ab)))}></i>
            </span>
          </div>
          ))}
        </div>
      </ div>

    
    </div>
  )
}
export default AbilityFilter

