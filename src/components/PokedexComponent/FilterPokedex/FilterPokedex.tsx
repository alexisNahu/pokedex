import { useModalContext } from '@components/Modal/context/UseModalContext'
import { Modal } from '@components/Modal/CustomModal'
import { usePokedexContext } from '@contexts/pokedex.context'
import { useEffect, useState } from 'react'
import { filterPokemonList } from '@services/index'
import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import './FilterPokedex.css'
import GenerationFilter from './GenerationFilter/GenerationFilter'
import { usePokedexPaginationContext } from '@contexts/pokedexPagination.context'
import TypesFilter from './TypesFilter/TypesFilter'
import { PokedexFilters } from '@models/pokemon.model'
import { PokemonType } from '@models/pokemonTypes.model'
import AbilityFilter from './AbilityFilter/AbilityFilter'

function FilterPokedex() {

    const { setState } = useModalContext()
    const { pokemonList } = usePokemonNamesContext()
    const {setCurrentPage} = usePokedexPaginationContext()
    const { setPokedexList } = usePokedexContext()

    const [generation, setGeneration] = useState<string[]>([])
    const [types, setTypes] = useState<[PokemonType | null, PokemonType | null]>([null, null]) 
    const [selectedAbilities, setSelectedAbilities] = useState<Set<string>>(new Set([]))

    const [ filters, setFilters ] = useState<PokedexFilters>()

    useEffect(() => {
        setFilters({
            generationFilter: generation,
            typesFilter: types,
            abilitiesFilter: [...selectedAbilities],
        })
    }, [generation, types, selectedAbilities])

    const applyFilters = async () => {
        const filter = async () => {
            console.log(filters)
            const filteredList = filters ? await filterPokemonList(filters, pokemonList) : null

            if (!filteredList?.size) {
                alert('Not a result for these filters')
                return
            }

            setCurrentPage(1)
            setPokedexList([...filteredList])
            setState(false)
        }

        filter()
    }

    const resetFilter = () => {
        setPokedexList([...pokemonList])
        setGeneration([])
        setState(false)
    }

    return (
        <>
            <i
                className="bi bi-filter-square-fill filter-icon"
                onClick={() => setState(true)}
                style={{color: 'black'}}
                title="Filter Pokémon"
            ></i>

            <Modal>
                <div className='filter' style={{width: 1000}}>
                    {/* filters */}
                    <GenerationFilter generation={generation} setGeneration={setGeneration} />
                    <TypesFilter types={types} setTypes={setTypes} />
                    <AbilityFilter selectedAbilities={selectedAbilities} setSelectedAbilities={setSelectedAbilities} />

                    <div className="d-flex justify-content-center gap-3">
                        <button
                            className="btn filter-action-btn apply-btn"
                            onClick={applyFilters}
                            disabled={!filters}
                        >
                            Apply
                        </button>
                        <button
                            className="btn filter-action-btn reset-btn"
                            onClick={resetFilter}
                        >
                            Reset Filter
                        </button>
                    </div>
                </div>
            </Modal>
            </>

    )
}

export default FilterPokedex
