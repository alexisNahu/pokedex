import { PokeTypes } from '@components/index'
import { usePokedexContext } from '@contexts/pokedex.context'
import { PokedexFilters } from '@models/pokemon.model'
import { POKEMON_TYPES, PokemonType } from '@models/pokemonTypes.model'
import React, { useEffect, useState } from 'react'


function TypesFilter() {
  const {filters, setFilters} = usePokedexContext()

  const [firstType, setFirstType] = useState<null | PokemonType>(null)
  const [secondType, setSecondType] = useState<null | PokemonType>(null)
  
  useEffect(() => {
    const updatedFilter: PokedexFilters = {...filters, typesFilter: [firstType, secondType]}
    setFilters(updatedFilter)
  }, [firstType, secondType])
  
  const allPokemonTypes = (Object.values(POKEMON_TYPES))

  const handleOnDragStart = (e: React.DragEvent, type: string  | null) => e.dataTransfer.setData('text/plain', type ? type : 'any')

  const handleOnDrop = (e: React.DragEvent, slot: 1 | 2) => {
    e.preventDefault()
    const type = e.dataTransfer.getData('text/plain')

    const selectedType = allPokemonTypes.find((entry => entry === type))

    if (!selectedType) {
      if (slot === 1) setFirstType(null)
      if (slot === 2) setSecondType(null)
    }

    if (slot === 1) setFirstType(type as PokemonType | null)
    if (slot === 2) setSecondType(type as PokemonType | null)    
  }

  
  return (
    <div>
      <div className="d-flex flex-column">
        <div className="col-md-4 d-flex flex-row align-items-center double-type">
          Double type: 
          <div className='pokemon-type justify-content-center align-items-center d-flex border border-primary p-3' style={{minHeight: '40px' }} onDrop={(e) => handleOnDrop(e, 1)} onDragOver={(e) => e.preventDefault()}>
            {firstType ? firstType : 'any'}
          </div>
          <div className='d-flex align-items-center'>/</div>
          <div className='pokemon-type justify-content-center align-items-center d-flex border border-primary p-3' style={{minHeight: '40px' }} onDrop={(e) => handleOnDrop(e, 2)} onDragOver={(e) => e.preventDefault()}>
            {secondType ? secondType : 'any'}
          </div>
        </div>
        <div className="col-md-9 pokemon-types d-flex flex-wrap" style={{maxWidth: '600px'}}>
          {
              allPokemonTypes.map((entry, i) => {
                return <div key={i} draggable onDragStart={(e) => handleOnDragStart(e, entry)}>
                  <PokeTypes pokemonTypes={entry}/>
                </div>
              })            
          }
          <div className='pokemon-type justify-content-center align-items-center d-flex' draggable onDragStart={(e) => handleOnDragStart(e, null)} style={{width: '100px', height: '50px', backgroundColor:'black'}}>
              {'any'.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypesFilter