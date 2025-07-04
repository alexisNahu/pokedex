import { getAllPokemonAbilities } from '@services/pokeapi.service'
import React, { useEffect, useState } from 'react'
import { mapToPokemonNamesDAO } from '@utilities/mappers/mapToPokemonNames'

interface Props {
  selectedAbilities: Set<string>
  setSelectedAbilities: React.Dispatch<React.SetStateAction<Set<string>>>
}

function AbilityFilter({ selectedAbilities, setSelectedAbilities }: Props) {

  const [allAbilities, setAllAbilities] = useState<Set<string>>(new Set([])) 
  const [searchContext, setSearchContext] = useState<string[]>([])

  const loadAbilities = async () => {
    try {
      const response = await getAllPokemonAbilities()
      const abilitiesNames = mapToPokemonNamesDAO(response.results)
      setAllAbilities(new Set<string>(abilitiesNames))
      setSearchContext(abilitiesNames)
    } catch (e) {
      console.error(`Error while fetching abilities: ${e}`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = [...e.target.selectedOptions]
    const updatedState = selectedOptions.map((option => option.value)).flat()
    setSelectedAbilities(new Set(updatedState))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase()
    const filtered = [...allAbilities].filter(ab => ab.toLowerCase().includes(inputValue))
    const results: Set<string> = new Set<string>([[...selectedAbilities], filtered].flat())
    setSearchContext(filtered.length ? [...results] : [...allAbilities])
  }

  useEffect(() => {
    if (!allAbilities.size) loadAbilities()
      setSearchContext([...allAbilities])
  }, [allAbilities])

  useEffect(() => {
    console.log(allAbilities, 'all abilities')
    console.log(selectedAbilities, 'selected abilities')
  }, [allAbilities, selectedAbilities])

  return (
    <div className="mb-3 w-25">
      <label htmlFor="abilities" className="form-label fw-bold">
        Abilities
      </label>
      <input type="text" className='form-control mb-3' onChange={(e) => handleInputChange(e)} placeholder='Search for an ability here..'/>
      <select
        multiple
        name="abilities"
        id="abilities"
        className="form-select"
        onChange={(e) => handleChange(e)}
        size={10} // Muestra hasta 10 opciones visibles sin scroll
      >
        {searchContext?.map((ability, index) => (
          <option key={index} value={ability}>
            {ability}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AbilityFilter
