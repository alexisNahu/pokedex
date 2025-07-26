import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cards from './Cards/Cards'
import { SuggestionInput, PokemonImage, PokemonVariants, PokeTypes, PokemonAbilities } from '@components'
import {Modal, useModalContext} from '@components/Modal'
import { getStatic3dSprite, getPokemonDTOByNameOrId, getActiveUserTeam, updateActiveUserTeam } from '@services'
import { CardData, PokemonDTO, Team, VariantPokemonDTO } from '@models'
import { AppDispatch, RootState, UsersState } from '@redux'
import { useGetAllNames } from '@hooks/useQueries'
import { useMobileContext } from '@contexts/isMobile.context'

function ComparingPage() {
  const [pageParams] = useSearchParams()
  const teamParam = pageParams.get('team')
  
  // Manejo correcto del estado de carga y datos
  const { data: pokemonList, isLoading, error } = useGetAllNames()
  const { setState } = useModalContext()

  const usersState: UsersState = useSelector((store: RootState) => store.user)
  const dispatch = useDispatch<AppDispatch>();

  const {isMobile} = useMobileContext()

  const [comparingList, setComparingList] = useState<Map<string, {
    value: PokemonDTO | VariantPokemonDTO | null, 
    original: PokemonDTO | null
  }>>(new Map([]))

  const [showingAbility, setShowingAbility] = useState<{
    name: string,
    pokedex_description: string,
    in_game_effect: string,
  }>()

  const controllerRef = useRef<AbortController>(new AbortController())

  // Estados de carga específicos
  const [isLoadingTeam, setIsLoadingTeam] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Cargar equipo inicial
  useEffect(() => {
    const loadInitialList = async (teamParam: string) => {
      if (!pokemonList) return
      
      setIsLoadingTeam(true)
      try {
        const activeUserTeam = getActiveUserTeam(usersState, teamParam.toString())
        
        if (activeUserTeam) {
          const teamPokemonsDTO = await Promise.all(
            activeUserTeam.pokemons
              .filter(poke => poke !== null)
              .map(poke => getPokemonDTO(poke))
          )

          if (teamPokemonsDTO.every(val => val !== null)) {
            const newMap = new Map<string, {
              value: PokemonDTO | VariantPokemonDTO | null, 
              original: PokemonDTO | null
            }>()
            
            teamPokemonsDTO.forEach(poke => {
              if (poke && poke.name) {
                newMap.set(poke.name, { value: poke, original: poke })
              }
            })

            setComparingList(newMap)
          }
        }
      } finally {
        setIsLoadingTeam(false)
      }
    }

    if (teamParam && pokemonList) {
      loadInitialList(teamParam)
    }
  }, [pageParams, pokemonList])

  // Actualizar equipo cuando cambia comparingList
  useEffect(() => {
    if (teamParam) {
      updateActiveUserTeam(usersState, [...comparingList.keys()], teamParam, dispatch)
    }
    
    return () => controllerRef.current.abort()
  }, [comparingList])

  // Renderizado de sugerencias
  const handleSuggestionRender = (name: string) => (
    <div className='d-flex flex-row justify-content-center'>
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
  )

  // Obtener datos de un Pokémon
  const getPokemonDTO = async (name: string) => {
    controllerRef.current = new AbortController()
    return await getPokemonDTOByNameOrId(name, controllerRef.current.signal)
  }

  // Manejar envío de formulario
  const onSubmitFn = async (name: string) => {
    if (!pokemonList || !pokemonList.has(name) || comparingList.size >= 6) return
    
    setIsSubmitting(true)
    try {
      const newPokemon = await getPokemonDTO(name)
      if (newPokemon) {
        setComparingList(prev => new Map([
          ...prev, 
          [name, { value: newPokemon, original: newPokemon }]
        ]))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Manejar clic en sugerencia
  const handleSuggestionClick = (name: string) => {
    onSubmitFn(name)
  }

  // Resto de funciones manejadoras...
  const handleAbilityClick = (entry: {
    name: string,
    pokedex_description: string,
    in_game_effect: string,
  }) => {
    setState(true)
    setShowingAbility(entry)
  }

  const deleteAndUpdateListState = (name: string) => {
    setComparingList(prev => {
      const newMap = new Map(prev)
      newMap.delete(name)
      return newMap
    })
  }

  const handleVariantChange = (variant: PokemonDTO | VariantPokemonDTO, original: PokemonDTO) => {
    setComparingList(prev => {
      const newMap = new Map(prev)
      newMap.set(original.name, {
        value: variant,
        original: original,
      })
      return newMap
    })
  }

  // Renderizado condicional
  if (isLoading || isLoadingTeam) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '800px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" style={{ height: '800px' }}>
        Error al cargar la lista de Pokémon: {error.message}
      </div>
    )
  }

  if (!pokemonList) {
    return (
      <div className="alert alert-warning" style={{ height: '800px' }}>
        No se pudo cargar la lista de Pokémon
      </div>
    )
  }

  return (
    <div
      className='comparing-page-container col-md-11 p-3'
      style={{ height: '800px', backgroundColor: 'rgba(0, 123, 255, 0.7)' }}
    >
      <div className={`container-fluid h-100 d-flex flex-column`}>
        
        {/* 🔍 Suggestion input (barra de búsqueda) */}
        <div className='row mb-3'>
          <div className='col-12 col-md-6 mx-auto position-sticky top-0 z-3'>
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
        </div>

        {/* 📊 Cards grid */}
        <div className='row flex-grow-1 overflow-auto'>
          <div className='col-12'>
            <div className={`table-responsive`}>
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
                  { column: 'Special Attack', data: (p: CardData) => p.variant.stats.find(v => v.stat === 'special-attack')?.value, width: 'auto' },
                  { column: 'Special Defense', data: (p: CardData) => p.variant.stats.find(v => v.stat === 'special-defense')?.value, width: 'auto' },
                  { column: 'Speed', data: (p: CardData) => p.variant.stats.find(v => v.stat === 'speed')?.value, width: 'auto' },
                  { column: 'Abilities', data: (p :CardData) => <PokemonAbilities poke={p.variant} handleClick={handleAbilityClick} minimizedVersion />, width: '200px'},
                  { column: '', data: (p: CardData) => <i className="bi bi-x-square fs-1" onClick={() => deleteAndUpdateListState(p.original.name)}></i>, width: 'auto'},
                ]}
              />
            </div>
          </div>
        </div>

        {/* 📦 Modal */}
        <Modal>
          <div>
            {showingAbility?.name.toUpperCase()}
            <p>{showingAbility?.in_game_effect}</p>
            <p>{showingAbility?.pokedex_description}</p>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default ComparingPage
