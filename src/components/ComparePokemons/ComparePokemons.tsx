import { useEffect, useRef, useState } from 'react'
import './ComparePokemons.css'
import SuggestionInput from '@components/layout/AutoSuggestionsInput/SuggestionInput'
import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import { getStatic3dSprite } from '@services/pokemonSprites.service'
import { CardData, PokemonDTO, VariantPokemonDTO } from '@models/pokemon.model'
import { getPokemonDTOByNameOrId } from '@services/index'
import PokemonImage from '@components/PokemonImage/PokemonImage'
import { Modal } from '@components/Modal/CustomModal'
import { useModalContext } from '@components/Modal/context/UseModalContext'
import Cards from './Cards/Cards'
import PokemonVariants from '@components/PokemonVariantsComponent/PokemonVariants'
import PokeTypes from '@components/PokeTypesComponent/PokeTypes'
import PokemonAbilities from '@components/PokemonAbilities/PokemonAbilities'

function ComparingPage() {
  const {pokemonList} = usePokemonNamesContext()
  const {setState} = useModalContext()

  const [comparingList, setComparingList] = useState<Map<string, {value: PokemonDTO | VariantPokemonDTO | null, original: PokemonDTO | null}>>(new Map([]))

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

  const onSubmitFn = async (name: string) => {
    if (pokemonList.has(name)) {
      const newPokemon = await getPokemonDTO(name)
      if (newPokemon) setComparingList(new Map([...comparingList, [name as string, {value: newPokemon, original: newPokemon}] ]))
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

  const handleVariantChange = (variant: PokemonDTO | VariantPokemonDTO, original: PokemonDTO) => {
    setComparingList((prev) => {
      const newMap = new Map(prev)
      newMap.set(original.name, {
        value: variant,
        original: original,
      })
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
          data={[...comparingList.values()]
                .filter(v => v.value !== null && v.original !== null)
                .map(v => ({
                  variant: v.value!,
                  original: v.original!
                }))}           
          columns={[
            { column: 'Variants', data: (p: CardData) => <PokemonVariants megas={p.original.megas} regional_versions={p.original.variants} 
                                                                  basePokemon={p.original} gmaxs={p.original.gigamax} 
                                                                  handleClick={newVariant => handleVariantChange(newVariant, p.original)} minimizedVersion={true} />, width: '250px'},
            { column: 'Sprite', data: (p: CardData) => <PokemonImage isShiny={false} poke={p.variant} imgWidth={100} />, width: 'auto'},
            { column: 'Types', data: (p: CardData) => <PokeTypes pokemonTypes={p.variant.types} />, width: '150px'},
            { column: 'HP', data: (p: CardData) => p.variant.stats.find(v => v.stat === 'hp')?.value ?? '', width: 'auto'},
            { column: 'Attack', data: (p: CardData) => p.variant.stats.find(v => v.stat === 'attack')?.value, width: 'auto'},
            { column: 'Defense', data: (p: CardData) => p.variant.stats.find(v => v.stat === 'defense')?.value, width: 'auto'},
            { column: 'Sp. Attack', data: (p: CardData) => p.variant.stats.find(v => v.stat === 'special-attack')?.value, width: 'auto' },
            { column: 'Sp. Defense', data: (p: CardData) => p.variant.stats.find(v => v.stat === 'special-defense')?.value, width: 'auto' },
            { column: 'Speed', data: (p: CardData) => p.variant.stats.find(v => v.stat === 'speed')?.value, width: 'auto' },
            { column: 'Abilities', data: (p :CardData) => <PokemonAbilities poke={p.variant} handleClick={handleAbilityClick} minimizedVersion />, width: '200px'},
            { column: '', data: (p: CardData) => <i className="bi bi-x-square fs-1" onClick={() => deleteAndUpdateListState(p.original.name)}></i>, width: 'auto'},
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