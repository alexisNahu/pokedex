import { useModalContext } from '@components/Modal/context/UseModalContext'
import { Modal } from '@components/Modal/CustomModal'
import { usePokedexContext } from '@contexts/pokedex.context'
import { useState } from 'react'
import { filterPokemonList } from '@services/index'
import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import './FilterPokedex.css'
import GenerationFilter from './GenerationFilter/GenerationFilter'

function FilterPokedex() {
    const { setState } = useModalContext()
    const { pokemonList } = usePokemonNamesContext()
    const { setPokedexList } = usePokedexContext()

    const [generation, setGeneration] = useState<string | null>(null)

    const applyFilters = async () => {
        const filter = async () => {
            const filteredList = await filterPokemonList({generationFilter: generation})
            setPokedexList(filteredList)
        }

        filter()
    }

    const resetFilter = () => {
        setPokedexList(pokemonList)
        setGeneration(null)
    }

    return (
        <>
            <i
                className="bi bi-filter-square-fill filter-icon"
                onClick={() => setState(true)}
                title="Filter Pokémon"
            ></i>

            <Modal>
                <GenerationFilter generation={generation} setGeneration={setGeneration} />
                <div className="d-flex justify-content-end gap-3">
                    <button
                        className="btn filter-action-btn apply-btn"
                        onClick={applyFilters}
                        disabled={!generation}
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
            </Modal>
            </>

    )
}

export default FilterPokedex
