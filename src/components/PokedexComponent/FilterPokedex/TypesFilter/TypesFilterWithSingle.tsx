import { PokeTypes } from '@components/index'
import { POKEMON_TYPES, PokemonType } from '@models/pokemonTypes.model'
import React, { useEffect, useState } from 'react'

interface Props {
  types: [] | [PokemonType | null, PokemonType | null],
  setTypes: React.Dispatch<React.SetStateAction<[PokemonType | null, PokemonType | null]>>
  onlyType: PokemonType | null
  setOnlyType: React.Dispatch<React.SetStateAction<PokemonType | null>>
}

function TypesFilter({ types, setTypes, onlyType, setOnlyType }: Props) {
  const [firstType, setFirstType] = useState<null | PokemonType>(null)
  const [secondType, setSecondType] = useState<null | PokemonType>(null)

  useEffect(() => {
    if (firstType !== null || secondType !== null) {
      setOnlyType(null)
    }
    setTypes([firstType, secondType])
  }, [firstType, secondType])

  useEffect(() => {
    if (onlyType !== null) {
      setFirstType(null)
      setSecondType(null)
      setTypes([null, null])
    }
  }, [onlyType])

  const allPokemonTypes = Object.values(POKEMON_TYPES)

  const handleOnDragStart = (e: React.DragEvent, type: string | null) =>
    e.dataTransfer.setData('text/plain', type ? type : 'any')

  const handleOnDrop = (e: React.DragEvent, slot: 0 | 1 | 2) => {
    e.preventDefault()
    const type = e.dataTransfer.getData('text/plain')

    if (type === 'any') {
      if (slot === 0) {
        setOnlyType(null)
      } else if (slot === 1) {
        setFirstType(null)
      } else if (slot === 2) {
        setSecondType(null)
      }
      return
    }

    if (!allPokemonTypes.includes(type as POKEMON_TYPES)) return

    if (slot === 0) {
      setOnlyType(type as PokemonType)
      setFirstType(null)
      setSecondType(null)
      setTypes([null, null])
    } else if (slot === 1) {
      setFirstType(type as PokemonType)
      setOnlyType(null)
    } else if (slot === 2) {
      setSecondType(type as PokemonType)
      setOnlyType(null)
    }
  }

  // Control para habilitar/deshabilitar
  const disableDoubleType = onlyType !== null
  const disableSingleType = firstType !== null || secondType !== null

  return (
    <div>
      <div className="d-flex flex-column">
        {/* Double Type */}
        <div
          className="col-md-4 d-flex flex-row align-items-center double-type"
          style={{ opacity: disableDoubleType ? 0.5 : 1, pointerEvents: disableDoubleType ? 'none' : 'auto' }}
        >
          Double type:
          <div
            className="pokemon-type justify-content-center align-items-center d-flex border border-primary p-3"
            style={{ minHeight: '40px' }}
            onDrop={(e) => !disableDoubleType && handleOnDrop(e, 1)}
            onDragOver={(e) => !disableDoubleType && e.preventDefault()}
          >
            {firstType ?? 'any'}
          </div>
          <div className="d-flex align-items-center">/</div>
          <div
            className="pokemon-type justify-content-center align-items-center d-flex border border-primary p-3"
            style={{ minHeight: '40px' }}
            onDrop={(e) => !disableDoubleType && handleOnDrop(e, 2)}
            onDragOver={(e) => !disableDoubleType && e.preventDefault()}
          >
            {secondType ?? 'any'}
          </div>
        </div>

        {/* Single Type */}
        <div
          className="col-md-4 d-flex flex-row align-items-center single-type"
          style={{ opacity: disableSingleType ? 0.5 : 1, pointerEvents: disableSingleType ? 'none' : 'auto' }}
        >
          Single type:
          <div
            className="pokemon-type justify-content-center align-items-center d-flex border border-primary p-3"
            style={{ minHeight: '40px' }}
            onDrop={(e) => !disableSingleType && handleOnDrop(e, 0)}
            onDragOver={(e) => !disableSingleType && e.preventDefault()}
          >
            {onlyType ?? 'any'}
          </div>
        </div>

        {/* Lista de tipos */}
        <div className="col-md-9 pokemon-types d-flex flex-wrap" style={{ width: '600px' }}>
          {allPokemonTypes.map((entry, i) => (
            <div key={i} draggable onDragStart={(e) => handleOnDragStart(e, entry)}>
              <PokeTypes pokemonTypes={entry} />
            </div>
          ))}
          <div
            className="pokemon-type justify-content-center align-items-center d-flex"
            draggable
            onDragStart={(e) => handleOnDragStart(e, null)}
            style={{ width: '100px', height: '50px', backgroundColor: 'black' }}
          >
            {'any'.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypesFilter
